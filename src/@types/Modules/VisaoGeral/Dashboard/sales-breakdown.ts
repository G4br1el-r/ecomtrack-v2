import type { CHANNEL_IDS } from "@/constants/Modules/VisaoGeral/Dashboard/channels";
import type { ORDER_STATUS_IDS } from "@/constants/Modules/VisaoGeral/Dashboard/order-statuses";
import type { BRAZIL_STATE_CODES } from "@/constants/Modules/VisaoGeral/Dashboard/states";

export type ChannelId = (typeof CHANNEL_IDS)[number];
export type OrderStatusId = (typeof ORDER_STATUS_IDS)[number];
export type StateCode = (typeof BRAZIL_STATE_CODES)[number];

export type ChannelSales = { id: ChannelId; revenue: number; orders: number };
export type StatusOrders = { id: OrderStatusId; orders: number };
export type StateSales = { code: StateCode; revenue: number; orders: number };

export type SalesBreakdown = {
  channels: ChannelSales[];
  statuses: StatusOrders[];
  states: StateSales[];
  hourly: number[][];
};

export type StateTile = {
  code: StateCode;
  row: number;
  column: number;
};
