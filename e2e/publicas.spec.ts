import { AUTH_BFF, FAKE_ID, SESSION_COOKIE_NAME } from "./constants";
import { expect, test } from "./fixtures";
import { bffRequest } from "./support/bff-request";

const NEW_PASSWORD = "SenhaForte2026";

test.describe("telas públicas", () => {
  test("esqueci a senha responde sempre a mesma mensagem", async ({ anonymous }) => {
    const page = await anonymous.newPage();

    await page.goto("/login");
    await page.getByRole("link", { name: "Esqueci minha senha" }).click();
    await page.waitForURL(/\/esqueci-senha$/);
    await page.waitForLoadState("networkidle");
    await page.getByLabel("E-mail").fill("ninguem@e2e.invalid");
    await page.getByRole("button", { name: "Enviar link" }).click();

    await expect(page.getByText(/Se ninguem@e2e.invalid estiver cadastrado/)).toBeVisible();
  });

  test("link de senha e convite inválidos explicam o que fazer", async ({ anonymous }) => {
    const page = await anonymous.newPage();

    await page.goto("/reset-password/token-invalido");
    await expect(page).toHaveURL(/\/redefinir-senha\/token-invalido/);
    await page.getByLabel("Nova senha", { exact: true }).fill(NEW_PASSWORD);
    await page.getByLabel("Repita a nova senha").fill(NEW_PASSWORD);
    await page.getByRole("button", { name: "Salvar nova senha" }).click();
    await expect(page.getByText(/já foi usado ou venceu/)).toBeVisible();

    await page.goto("/invite/token-invalido");
    await expect(page.getByText(/Este convite venceu ou já foi usado/)).toBeVisible();
  });

  test("senha errada mostra a mensagem da API", async ({ anonymous }) => {
    const page = await anonymous.newPage();

    await page.goto("/login");
    await page.getByLabel("E-mail").fill("ninguem@e2e.invalid");
    await page.getByLabel("Senha", { exact: true }).fill("senha-errada");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("E-mail ou senha inválidos.")).toBeVisible();
  });

  test("código, reenvio e aceite de convite com dados vencidos são recusados pela API", async ({ anonymous }) => {
    const verify = await bffRequest(anonymous.request, "POST", `${AUTH_BFF}/verify`, {
      data: { challengeId: FAKE_ID, code: "000000" },
      test: "código de login vencido",
    });
    const resend = await bffRequest(anonymous.request, "POST", `${AUTH_BFF}/resend`, {
      data: { challengeId: FAKE_ID },
      test: "reenvio de código vencido",
    });

    for (const response of [verify, resend]) {
      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
      expect((await response.json()).message).toBeTruthy();
    }
  });

  test("sair encerra a sessão no servidor e apaga o cookie", async ({ anonymous }) => {
    await anonymous.addCookies([
      {
        name: SESSION_COOKIE_NAME,
        value: encodeURIComponent("ecomtrack_refresh=sessao-e2e-descartavel"),
        domain: "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    const response = await bffRequest(anonymous.request, "POST", `${AUTH_BFF}/logout`, { test: "sair" });

    expect(response.status()).toBe(204);
    expect(await anonymous.cookies()).toEqual([]);
  });
});
