import { expect, type Page } from "@playwright/test";

const FAKE_VALUE_BY_TYPE: Record<string, string> = {
  url: "https://e2e.test",
  email: "e2e@e2e.test",
  number: "587",
};

export async function connectionLifecycle(page: Page, name: string) {
  const providers = page.getByRole("region", { name: "Provedores disponíveis" });
  await providers
    .getByRole("button", { name: /^Conectar/ })
    .first()
    .click();

  const sheet = page.getByRole("dialog");
  await sheet.getByLabel("Nome da conexão").fill(name);
  const inputs = sheet.locator('input[id^="integration-field-"]');
  for (let index = 0; index < (await inputs.count()); index += 1) {
    const input = inputs.nth(index);
    const type = (await input.getAttribute("type")) ?? "text";
    await input.fill(FAKE_VALUE_BY_TYPE[type] ?? "e2e-teste");
  }
  await sheet.getByRole("button", { name: "Conectar" }).click();
  await expect(page.getByText("Conexão criada")).toBeVisible();
  await expect(sheet).toBeHidden();

  const actions = page.getByRole("button", { name: new RegExp(`Ações da conexão .* · ${name}$`) });
  await actions.click();
  await page.getByRole("menuitem", { name: "Editar" }).click();
  await expect(sheet.getByLabel("Nome da conexão")).toHaveValue(name);
  await sheet.getByLabel("Nome da conexão").fill(`${name} editada`);
  await sheet.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Conexão atualizada")).toBeVisible();

  const edited = page.getByRole("button", { name: new RegExp(`Ações da conexão .* · ${name} editada$`) });
  await edited.click();
  await page.getByRole("menuitem", { name: "Pausar" }).click();
  await expect(page.getByText("Conexão pausada")).toBeVisible();

  await edited.click();
  await page.getByRole("menuitem", { name: "Remover" }).click();
  await page.getByRole("button", { name: "Remover conexão" }).click();
  await expect(page.getByText("Conexão removida")).toBeVisible();
}
