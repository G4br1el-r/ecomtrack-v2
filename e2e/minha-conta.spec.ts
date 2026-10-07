import { WRONG_PASSWORD } from "./constants";
import { expect, test } from "./fixtures";

const NEW_PASSWORD = "NovaSenhaE2e2026";
const PIN = "4826";

test("minha conta mostra os dados e salva o nome", async ({ page }) => {
  await page.goto("/minha-conta");
  const firstName = page.getByLabel("Nome", { exact: true });
  await expect(firstName).not.toHaveValue("");
  const original = await firstName.inputValue();

  await firstName.fill(`${original} E2E`);
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Perfil atualizado")).toBeVisible();

  await firstName.fill(original);
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Perfil atualizado").first()).toBeVisible();
  await expect(firstName).toHaveValue(original);
});

test("trocar senha e PIN exigem a senha atual correta", async ({ page }) => {
  await page.goto("/minha-conta?aba=seguranca");
  await expect(page.getByText("PIN de 4 dígitos")).toBeVisible();
  await expect(page.getByText("PIN de 6 dígitos")).toBeVisible();

  await page.getByLabel("Senha atual").fill(WRONG_PASSWORD);
  await page.getByLabel("Nova senha", { exact: true }).fill(NEW_PASSWORD);
  await page.getByLabel("Repita a nova senha").fill(NEW_PASSWORD);
  await page.getByRole("button", { name: "Trocar senha" }).click();
  await expect(page.getByText("Senha atual incorreta.")).toBeVisible();

  await page
    .getByRole("button", { name: /^(Criar|Trocar) PIN$/ })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Novo PIN").fill(PIN);
  await dialog.getByLabel("Repita o PIN").fill(PIN);
  await dialog.getByLabel("Senha atual").fill(WRONG_PASSWORD);
  await dialog.getByRole("button", { name: "Salvar PIN" }).click();
  await expect(dialog.getByText("Senha atual incorreta.")).toBeVisible();
});
