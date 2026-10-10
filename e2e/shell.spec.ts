import { E2E_COMPANY_NAME } from "./constants";
import { expect, test } from "./fixtures";

const USERS_PAGE_ENDPOINTS = 21;

test("quem não está logado cai no login", async ({ anonymous }) => {
  const page = await anonymous.newPage();

  await page.goto("/administracao/usuarios");

  await expect(page).toHaveURL(/\/login\?redirect=%2Fadministracao%2Fusuarios/);
});

test("o Owner vê o botão de dev com os endpoints de cada página", async ({ page }) => {
  await page.goto("/administracao/usuarios");
  const devButton = page.getByRole("button", { name: `Endpoints da API nesta página: ${USERS_PAGE_ENDPOINTS}` });
  await expect(devButton).toBeVisible();

  await devButton.click();
  const pageEndpoints = page.getByRole("region", { name: "Nesta página" });
  await expect(pageEndpoints.getByRole("listitem")).toHaveCount(USERS_PAGE_ENDPOINTS);
  await expect(pageEndpoints.getByText("/users/{id}/view-as")).toBeAttached();
  await page.keyboard.press("Escape");

  await page.goto("/visao-geral/dashboard");
  await page.getByRole("button", { name: "Endpoints da API nesta página: 0" }).click();
  await expect(page.getByText("Esta página ainda usa dados simulados.")).toBeVisible();
});

test("o seletor do topo mostra a empresa dos testes", async ({ page }) => {
  await page.goto("/administracao/usuarios");

  await expect(page.getByRole("combobox", { name: "Empresa em uso" })).toHaveText(E2E_COMPANY_NAME);
});

test("o menu pinta de azul as rotas ligadas à API", async ({ page }) => {
  await page.goto("/administracao/usuarios");

  const menuLink = (href: string) => page.locator(`[data-sidebar="menu-button"][href="${href}"]`);
  await expect(menuLink("/administracao/usuarios")).toHaveAttribute("data-integrated", "true");
  await expect(menuLink("/administracao/usuarios").locator("svg").first()).toBeVisible();
});

test("o menu e os botões vêm das permissões da API", async ({ page, ownerApi, e2eCompany }) => {
  const menu = await ownerApi.get<{ pages: { code: string; route: string | null; enabled: boolean }[] }[]>(
    "/permissions/menu",
    e2eCompany.id,
  );
  const users = menu.flatMap((section) => section.pages).find((item) => item.code === "usuarios");
  expect(users?.enabled).toBe(true);

  const components = await ownerApi.get<{ pageEnabled: boolean; components: { enabled: boolean }[] }>(
    "/permissions/usuarios/components",
    e2eCompany.id,
  );
  expect(components.pageEnabled).toBe(true);
  expect(components.components.every((component) => component.enabled)).toBe(true);

  await page.goto("/administracao/usuarios");
  await expect(page.getByRole("button", { name: "Convidar usuário" })).toBeEnabled();
});

test("preferências: a quantidade por página da tabela fica salva na API", async ({ page, ownerApi, e2eCompany }) => {
  const key = "table.administracao-auditoria";
  await ownerApi.send("PUT", `/auth/me/preferences/${key}`, { value: { pageSize: 20 } }, e2eCompany.id);
  expect(
    (await ownerApi.get<{ value: { pageSize: number } }>(`/auth/me/preferences/${key}`, e2eCompany.id)).value,
  ).toEqual({ pageSize: 20 });

  await page.goto("/administracao/auditoria");
  await expect(page.getByRole("combobox", { name: "Itens por página" }).first()).toHaveText("20");

  const all = await ownerApi.get<{ key: string }[]>("/auth/me/preferences", e2eCompany.id);
  expect(all.map((preference) => preference.key)).toContain(key);

  const removed = await ownerApi.call("DELETE", `/auth/me/preferences/${key}`, { companyId: e2eCompany.id });
  expect(removed.status()).toBe(204);
});
