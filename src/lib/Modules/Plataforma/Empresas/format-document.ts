const CPF_PATTERN = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
const CNPJ_PATTERN = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;

export function formatDocument(document: string | null): string {
  if (!document) return "";
  if (CNPJ_PATTERN.test(document)) return document.replace(CNPJ_PATTERN, "$1.$2.$3/$4-$5");
  if (CPF_PATTERN.test(document)) return document.replace(CPF_PATTERN, "$1.$2.$3-$4");
  return document;
}
