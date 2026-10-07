import type { Page } from "@playwright/test";

import { E2E_COMPANY_NAME, E2E_PLAN_NAME } from "./constants";
import { expect, test } from "./fixtures";
import { generateCnpj } from "./support/generate-cnpj";

const RUN = Date.now();
const COMPANY_NAME = `E2E Empresa ${RUN}`;
const PLAN_NAME = `E2E Plano ${RUN}`;

async function search(page: Page, text: string) {
  await page.getByRole("searchbox", { name: "Buscar na tabela" }).fill(text);
  await page.keyboard.press("Enter");
}

async function rowAction(page: Page, menu: string, item: string) {
  await page.getByRole("button", { name: menu }).click();
  await page.getByRole("menuitem", { name: item }).click();
}

test("empresas: cria, edita, suspende e reativa", async ({ page }) => {
  await page.goto("/plataforma/empresas");
  await page.getByRole("button", { name: "Nova empresa" }).click();
  const sheet = page.getByRole("dialog");
  await sheet.getByLabel("Nome").fill(COMPANY_NAME);
  await sheet.getByRole("combobox", { name: "Plano" }).click();
  await page.getByRole("option", { name: E2E_PLAN_NAME }).click();
  await sheet.getByRole("button", { name: "Criar empresa" }).click();
  await expect(page.getByText("Empresa criada")).toBeVisible();

  await search(page, COMPANY_NAME);
  await expect(page.getByRole("cell", { name: COMPANY_NAME, exact: true })).toBeVisible();
  await rowAction(page, `Ações da empresa ${COMPANY_NAME}`, "Editar");
  await expect(sheet.getByLabel("Nome")).toHaveValue(COMPANY_NAME);
  await sheet.getByLabel(/CNPJ ou CPF/).fill(generateCnpj(RUN));
  await sheet.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Empresa atualizada")).toBeVisible();

  const menu = `Ações da empresa ${COMPANY_NAME}`;
  await rowAction(page, menu, "Suspender");
  await page.getByRole("button", { name: "Suspender empresa" }).click();
  await expect(page.getByText("Empresa suspensa")).toBeVisible();
  await rowAction(page, menu, "Reativar");
  await expect(page.getByText("Empresa reativada")).toBeVisible();
  await rowAction(page, menu, "Suspender");
  await page.getByRole("button", { name: "Suspender empresa" }).click();
  await expect(page.getByText("Empresa suspensa").first()).toBeVisible();
});

test("empresas: a empresa dos testes aparece na lista e responde como empresa atual", async ({
  page,
  ownerApi,
  e2eCompany,
}) => {
  await page.goto("/plataforma/empresas");
  await search(page, E2E_COMPANY_NAME);
  await expect(page.getByRole("cell", { name: E2E_COMPANY_NAME, exact: true })).toBeVisible();

  const mine = await ownerApi.get<{ id: string; name: string }>("/companies/me", e2eCompany.id);
  expect(mine).toMatchObject({ id: e2eCompany.id, name: E2E_COMPANY_NAME });
});

test("planos: cria, libera páginas, edita e remove", async ({ page }) => {
  await page.goto("/plataforma/planos");
  await page.getByRole("button", { name: "Novo plano" }).click();
  await page.getByRole("dialog").getByLabel("Nome").fill(PLAN_NAME);
  await page.getByRole("button", { name: "Criar plano" }).click();
  await expect(page.getByText("Plano criado")).toBeVisible();

  const sheet = page.getByRole("dialog");
  await sheet.getByRole("checkbox").first().check();
  await sheet.getByRole("button", { name: "Salvar permissões" }).click();
  await expect(page.getByText("Permissões do plano salvas")).toBeVisible();
  await expect(sheet).toBeHidden();

  await page.reload();
  await search(page, PLAN_NAME);
  const menu = `Ações do plano ${PLAN_NAME}`;
  await rowAction(page, menu, "Permissões");
  await expect(sheet.getByRole("checkbox").first()).toBeChecked();
  await sheet.getByRole("button", { name: "Cancelar" }).click();
  await expect(sheet).toBeHidden();

  await rowAction(page, menu, "Editar");
  await page.getByRole("dialog").getByLabel("Descrição").fill("Plano criado pelos testes E2E.");
  await page.getByRole("dialog").getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Plano atualizado")).toBeVisible();

  await rowAction(page, menu, "Remover plano");
  await page.getByRole("button", { name: "Remover plano" }).click();
  await expect(page.getByText("Plano removido")).toBeVisible();
});

test("auditoria lista os registros e abre o detalhe", async ({ page }) => {
  await page.goto("/administracao/auditoria");
  const firstDetail = page.getByRole("button", { name: /^Ver detalhe/ }).first();
  await expect(firstDetail).toBeVisible();

  await firstDetail.click();
  await expect(page.getByRole("dialog").getByText("Dados técnicos")).toBeVisible();
});
