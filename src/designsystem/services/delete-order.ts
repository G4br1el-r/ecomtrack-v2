import { removeById } from "@/lib/Modules/Core/DesignSystem/remove-by-id";

import { wait } from "../helpers/wait";
import { DEMO_LATENCY_MS } from "../mocks/demo";
import { ordersMemory } from "./orders-memory";

export async function deleteOrder(id: string): Promise<string> {
  await wait(DEMO_LATENCY_MS);
  ordersMemory.items = removeById(ordersMemory.items, id).list;
  return id;
}
