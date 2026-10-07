import { expect, test } from "./fixtures";
import { connectionLifecycle } from "./support/connection-lifecycle";

const RUN = Date.now();

test("comunicação edita um e-mail, salva como padrão, restaura, envia teste e liga/desliga", async ({ page }) => {
  await page.goto("/administracao/comunicacao");
  const messages = page.getByRole("region", { name: "E-mails disparados" });
  const editButton = messages.getByRole("button", { name: /^Editar / }).first();
  await editButton.click();

  const sheet = page.getByRole("dialog");
  const subject = sheet.getByLabel("Assunto");
  await expect(sheet.getByLabel("Conteúdo (HTML)")).not.toHaveValue("");
  await expect(sheet.getByTitle("Prévia do e-mail")).toBeVisible();
  await sheet.getByRole("button", { name: "Atualizar prévia" }).click();

  await subject.fill(`${await subject.inputValue()} (E2E ${RUN})`);
  await sheet.getByRole("button", { name: "Salvar", exact: true }).click();
  await expect(page.getByText("E-mail salvo")).toBeVisible();
  await expect(sheet).toBeHidden();
  await editButton.click();
  await expect(subject).toHaveValue(new RegExp(`\\(E2E ${RUN}\\)$`));

  await sheet.getByRole("button", { name: "Salvar como padrão" }).click();
  await expect(page.getByText("Salvo como padrão da empresa")).toBeVisible();

  await sheet.getByRole("button", { name: "Restaurar padrão" }).click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Restaurar" }).click();
  await expect(page.getByText("Texto padrão restaurado")).toBeVisible();

  await sheet.getByRole("button", { name: "Enviar teste" }).click();
  await expect(page.getByText("E-mail de teste enviado")).toBeVisible();
  await sheet.getByRole("button", { name: "Fechar" }).first().click();

  const toggle = messages.getByRole("switch").and(page.locator(":not([disabled])")).first();
  const wasOn = await toggle.isChecked();
  await toggle.click();
  await expect(page.getByText(wasOn ? "E-mail desligado" : "E-mail ligado")).toBeVisible();
  await toggle.click();
  await expect(toggle).toBeChecked({ checked: wasOn });
});

test("conta de envio: conecta, edita, pausa e remove", async ({ page }) => {
  await page.goto("/administracao/comunicacao");
  await page.getByRole("tab", { name: "Conta de envio" }).click();

  await connectionLifecycle(page, `E2E e-mail ${RUN}`);
});
