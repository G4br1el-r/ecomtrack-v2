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
  await expect(menuLink("/visao-geral/dashboard")).not.toHaveAttribute("data-integrated");
});
