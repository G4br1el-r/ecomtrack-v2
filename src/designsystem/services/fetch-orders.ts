import { wait } from "../helpers/wait";
import { DEMO_LATENCY_MS } from "../mocks/demo";
import type { Order } from "../mocks/orders";
import { ordersMemory } from "./orders-memory";

export async function fetchOrders(): Promise<Order[]> {
  await wait(DEMO_LATENCY_MS);
  return [...ordersMemory.items];
}
