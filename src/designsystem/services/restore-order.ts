import type { RemovedItem } from "@/@types/Modules/Core/DesignSystem/removed-item";
import { restoreAt } from "@/lib/Modules/Core/DesignSystem/restore-at";

import { wait } from "../helpers/wait";
import { DEMO_LATENCY_MS } from "../mocks/demo";
import type { Order } from "../mocks/orders";
import { ordersMemory } from "./orders-memory";

export async function restoreOrder(removed: RemovedItem<Order>): Promise<void> {
  await wait(DEMO_LATENCY_MS);
  ordersMemory.items = restoreAt(ordersMemory.items, removed);
}
