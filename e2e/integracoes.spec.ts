import { FAKE_ID, FIRST_SERVER_ERROR } from "./constants";
import { expect, test } from "./fixtures";
import { connectionLifecycle } from "./support/connection-lifecycle";
import { expectUnknownConnectionRejected } from "./support/expect-unknown-connection-rejected";

const RUN = Date.now();
const FIRST_CLIENT_ERROR = 400;

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

test("agentes IA: a aba Tarefas lista as tarefas e a geração sem IA escolhida é recusada", async ({
  page,
  ownerApi,
  e2eCompany,
}) => {
  const tasks = await ownerApi.get<{ key: string; name: string }[]>("/ai/tasks", e2eCompany.id);

  await page.goto("/administracao/agentes-ia");
  await page.getByRole("tab", { name: "Tarefas" }).click();
  const panel = page.getByRole("tabpanel", { name: "Tarefas" });
  if (tasks.length === 0) {
    await expect(panel.getByText("Nenhuma tarefa de IA disponível")).toBeVisible();
  } else {
    await expect(panel.getByText(tasks[0].name)).toBeVisible();
  }

  const generation = await ownerApi.call("POST", `/ai/tasks/${tasks[0]?.key ?? "tags"}/generate`, {
    body: { variables: { titulo: "Hades" }, integrationId: FAKE_ID },
    companyId: e2eCompany.id,
  });
  expect(generation.status()).toBeGreaterThanOrEqual(FIRST_CLIENT_ERROR);
  expect(generation.status()).toBeLessThan(FIRST_SERVER_ERROR);
});
