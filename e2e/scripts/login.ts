import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const AUTH_DIR = "e2e/.auth";
const CHALLENGE_FILE = `${AUTH_DIR}/challenge.json`;
const STATE_FILE = `${AUTH_DIR}/owner.json`;
const SESSION_COOKIE_NAME = "ecomtrack_session";
const MS_PER_SECOND = 1000;
const BROWSER_SESSION_COOKIE = -1;

const apiUrl = process.env.E2E_API_URL;
const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;
const code = process.env.E2E_LOGIN_CODE;

if (!apiUrl || !email || !password) {
  throw new Error("Preencha E2E_API_URL, E2E_EMAIL e E2E_PASSWORD no .env.e2e.local.");
}

mkdirSync(AUTH_DIR, { recursive: true });

if (!code) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`Login recusado: ${body.message ?? response.status}`);
  writeFileSync(CHALLENGE_FILE, JSON.stringify(body));
  console.log(`Código enviado para ${body.maskedEmail}. Rode: E2E_LOGIN_CODE=xxxxxx pnpm e2e:login`);
} else {
  if (!existsSync(CHALLENGE_FILE)) throw new Error("Peça o código primeiro: pnpm e2e:login");
  const { challengeId } = JSON.parse(readFileSync(CHALLENGE_FILE, "utf8"));
  const response = await fetch(`${apiUrl}/auth/login/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, code }),
  });
  if (!response.ok) throw new Error(`Código recusado: ${(await response.json()).message ?? response.status}`);
  const [pair, ...attributes] = (response.headers.getSetCookie()[0] ?? "").split(";");
  const expiresAttribute = attributes
    .map((attribute) => attribute.trim())
    .find((attribute) => attribute.toLowerCase().startsWith("expires="));
  const expires = expiresAttribute
    ? new Date(expiresAttribute.slice("expires=".length)).getTime() / MS_PER_SECOND
    : BROWSER_SESSION_COOKIE;
  writeFileSync(
    STATE_FILE,
    JSON.stringify({
      cookies: [
        {
          name: SESSION_COOKIE_NAME,
          value: encodeURIComponent(pair.trim()),
          domain: "localhost",
          path: "/",
          expires,
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    }),
  );
  console.log(`Sessão do E2E salva em ${STATE_FILE}.`);
}
