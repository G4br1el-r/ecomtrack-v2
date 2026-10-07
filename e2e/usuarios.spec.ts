import type { Page } from "@playwright/test";

import { E2E_PASSWORD_FOR_NEW_USERS } from "./constants";
import { expect, test } from "./fixtures";

const RUN = Date.now();
const PROFILE_NAME = `E2E Perfil ${RUN}`;
const MEMBER = {
  firstName: "Membro",
  lastName: `E2E ${RUN}`,
  email: `gabriel_rodrigues_+e2e-membro-${RUN}@hotmail.com`,
};
const GUEST = {
  firstName: "Convidado",
  lastName: `E2E ${RUN}`,
  email: `gabriel_rodrigues_+e2e-convite-${RUN}@hotmail.com`,
};
const INVITE_PROFILE = "Master";
const EDITED_LAST_NAME = `E2E ${RUN} Editado`;

async function invite(page: Page, person: typeof MEMBER) {
  await page.getByRole("button", { name: "Convidar usuário" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Nome", { exact: true }).fill(person.firstName);
  await dialog.getByLabel("Sobrenome").fill(person.lastName);
  await dialog.getByLabel("E-mail").fill(person.email);
  await dialog.getByRole("combobox", { name: "Perfil" }).click();
  await page.getByRole("option", { name: INVITE_PROFILE }).click();
  await dialog.getByRole("button", { name: "Enviar convite" }).click();
  await expect(page.getByText("Convite enviado")).toBeVisible();
}

async function search(page: Page, tab: string, text: string) {
  await page.getByRole("tabpanel", { name: tab }).getByRole("searchbox", { name: "Buscar na tabela" }).fill(text);
  await page.keyboard.press("Enter");
}

async function rowAction(page: Page, menu: string, item: string) {
  await page.getByRole("button", { name: menu }).click();
  await page.getByRole("menuitem", { name: item }).click();
}

test.describe
  .serial("usuários, convites e perfis", () => {
    test("lista os usuários da empresa", async ({ page }) => {
      await page.goto("/administracao/usuarios");

      await expect(page.getByRole("radiogroup", { name: "Situação", exact: true })).toBeVisible();
      await expect(page.getByRole("tabpanel", { name: "Usuários" }).getByRole("table")).toBeVisible();
    });

    test("cria, edita, libera permissões, visualiza como e remove um perfil", async ({ page }) => {
      await page.goto("/administracao/usuarios");
      await page.getByRole("tab", { name: "Perfis" }).click();
      await page.getByRole("button", { name: "Novo perfil" }).click();
      await page.getByRole("dialog").getByLabel("Nome").fill(PROFILE_NAME);
      await page.getByRole("button", { name: "Criar perfil" }).click();
      await expect(page.getByText("Perfil criado")).toBeVisible();

      const sheet = page.getByRole("dialog");
      await expect(sheet.getByText(/páginas e .* ações marcadas/)).toBeVisible();
      await sheet.getByRole("checkbox").first().check();
      await sheet.getByRole("button", { name: "Salvar permissões" }).click();
      await expect(page.getByText("Permissões salvas")).toBeVisible();
      await expect(sheet).toBeHidden();

      await page.reload();
      await page.getByRole("tab", { name: "Perfis" }).click();
      const menu = `Ações do perfil ${PROFILE_NAME}`;
      await rowAction(page, menu, "Permissões");
      await expect(sheet.getByRole("checkbox").first()).toBeChecked();
      await sheet.getByRole("button", { name: "Cancelar" }).click();
      await expect(sheet).toBeHidden();

      await rowAction(page, menu, "Editar");
      await page.getByRole("dialog").getByLabel("Descrição").fill("Perfil criado pelos testes E2E.");
      await page.getByRole("dialog").getByRole("button", { name: "Salvar" }).click();
      await expect(page.getByText("Perfil atualizado")).toBeVisible();

      await rowAction(page, menu, "Visualizar como");
      await expect(page.getByRole("status").filter({ hasText: "Somente leitura" })).toBeVisible();
      await page.getByRole("button", { name: "Sair da visualização" }).click();

      await rowAction(page, menu, "Remover perfil");
      await page.getByRole("button", { name: "Remover perfil" }).click();
      await expect(page.getByText("Perfil removido")).toBeVisible();
    });

    test("convida, o convidado aceita e o usuário passa por todas as ações", async ({ page, anonymous }) => {
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.goto("/administracao/usuarios");
      await invite(page, MEMBER);

      await page.getByRole("tab", { name: "Convites" }).click();
      await search(page, "Convites", MEMBER.email);
      await rowAction(page, `Ações do convite de ${MEMBER.firstName} ${MEMBER.lastName}`, "Copiar link");
      await expect(page.getByText("Link copiado")).toBeVisible();
      const link = await page.evaluate(() => navigator.clipboard.readText());
      const token = new URL(link).pathname.split("/").filter(Boolean).at(-1);

      const guestPage = await anonymous.newPage();
      await guestPage.goto(`/convite/${token}`);
      await expect(guestPage.getByLabel("E-mail")).toHaveValue(MEMBER.email);
      await guestPage.getByLabel("Nova senha", { exact: true }).fill(E2E_PASSWORD_FOR_NEW_USERS);
      await guestPage.getByLabel("Repita a nova senha").fill(E2E_PASSWORD_FOR_NEW_USERS);
      await guestPage.getByRole("button", { name: "Criar senha e entrar" }).click();
      await expect(guestPage.getByText("Senha criada")).toBeVisible();

      await page.reload();
      await page.getByRole("tab", { name: "Usuários" }).click();
      await search(page, "Usuários", MEMBER.email);
      await rowAction(page, `Ações de ${MEMBER.firstName} ${MEMBER.lastName}`, "Editar");
      const sheet = page.getByRole("dialog");
      await expect(sheet.getByLabel("Sobrenome")).toHaveValue(MEMBER.lastName);
      await sheet.getByLabel("Sobrenome").fill(EDITED_LAST_NAME);
      await sheet.getByRole("button", { name: "Salvar" }).click();
      await expect(page.getByText("Usuário atualizado")).toBeVisible();

      const menu = `Ações de ${MEMBER.firstName} ${EDITED_LAST_NAME}`;
      await rowAction(page, menu, "Log de atividades");
      await expect(page.getByRole("dialog", { name: "Log de atividades" })).toBeVisible();
      await page.keyboard.press("Escape");

      await rowAction(page, menu, "Visualizar como");
      await expect(page.getByRole("status").filter({ hasText: "Somente leitura" })).toBeVisible();
      await page.getByRole("button", { name: "Sair da visualização" }).click();

      await rowAction(page, menu, "Redefinir senha");
      await expect(page.getByText("Link de troca de senha enviado")).toBeVisible();

      await rowAction(page, menu, "Desativar");
      await expect(page.getByText("Usuário desativado")).toBeVisible();
      await rowAction(page, menu, "Reativar");
      await expect(page.getByText("Usuário reativado")).toBeVisible();
      await rowAction(page, menu, "Desativar");
      await expect(page.getByText("Usuário desativado").first()).toBeVisible();
    });

    test("reenvia e cancela um convite", async ({ page }) => {
      await page.goto("/administracao/usuarios");
      await invite(page, GUEST);

      await page.getByRole("tab", { name: "Convites" }).click();
      await search(page, "Convites", GUEST.email);
      const menu = `Ações do convite de ${GUEST.firstName} ${GUEST.lastName}`;

      await rowAction(page, menu, "Reenviar convite");
      await expect(page.getByText("Convite reenviado")).toBeVisible();

      await rowAction(page, menu, "Cancelar convite");
      await page.getByRole("button", { name: "Cancelar convite" }).click();
      await expect(page.getByText("Convite cancelado")).toBeVisible();
    });
  });
