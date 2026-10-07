import { ORDERS, type Order } from "../mocks/orders";

export const ordersMemory: { items: Order[] } = { items: [...ORDERS] };
