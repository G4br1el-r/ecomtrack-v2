const BRANCH = "0001";
const ROOT_LENGTH = 8;
const FIRST_DIGIT_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const SECOND_DIGIT_WEIGHTS = [6, ...FIRST_DIGIT_WEIGHTS];
const MODULUS = 11;
const LOWEST_REMAINDER_WITH_DIGIT = 2;

const checkDigit = (digits: string, weights: number[]) => {
  const remainder = [...digits].reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0) % MODULUS;
  return remainder < LOWEST_REMAINDER_WITH_DIGIT ? 0 : MODULUS - remainder;
};

export function generateCnpj(seed: number): string {
  const base = `${String(seed).slice(-ROOT_LENGTH).padStart(ROOT_LENGTH, "0")}${BRANCH}`;
  const withFirst = `${base}${checkDigit(base, FIRST_DIGIT_WEIGHTS)}`;
  return `${withFirst}${checkDigit(withFirst, SECOND_DIGIT_WEIGHTS)}`;
}
