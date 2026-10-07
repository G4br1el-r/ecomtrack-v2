import type { ExchangeRates } from "@/@types/Modules/Catalogo/EsteiraCadastro/exchange-rate";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { EXCHANGE_RATES_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/exchange-rates";

export async function getExchangeRates(): Promise<ExchangeRates> {
  await wait(MOCK_LATENCY_IN_MS);
  return EXCHANGE_RATES_MOCK;
}
