import { expect, test } from "./fixtures";
import { connectionLifecycle } from "./support/connection-lifecycle";
import { expectUnknownConnectionRejected } from "./support/expect-unknown-connection-rejected";

const RUN = Date.now();

test("e-commerce: conecta, edita, pausa e remove uma loja", async ({ page }) => {
  await page.goto("/administracao/ecommerce");

  await connectionLifecycle(page, `E2E loja ${RUN}`);
});

test("fornecedores: sem provedor na API, a tela avisa, a API recusa conexões inexistentes e o catálogo abre", async ({
  page,
  ownerApi,
  e2eCompany,
}) => {
  await page.goto("/administracao/fornecedores");
  await expect(page.getByText("Nenhum provedor disponível")).toBeVisible();
  await expectUnknownConnectionRejected(ownerApi, "/integrations/suppliers", e2eCompany.id);

  await page.getByRole("tab", { name: "Catálogo" }).click();
  await expect(page.getByRole("radiogroup", { name: "Itens do catálogo" })).toBeVisible();
  await expect(page.getByRole("tabpanel", { name: "Catálogo" }).getByRole("table")).toBeVisible();
});

test("agentes IA: sem provedor na API, a tela avisa e a API recusa conexões inexistentes", async ({
  page,
  ownerApi,
  e2eCompany,
}) => {
  await page.goto("/administracao/agentes-ia");
  await expect(page.getByText("Nenhum provedor disponível")).toBeVisible();
  await expect(page.getByText("Nenhuma conexão ainda")).toBeVisible();

  await expectUnknownConnectionRejected(ownerApi, "/integrations/ai", e2eCompany.id);
});
