"use client";

import { useQuery } from "@tanstack/react-query";

import { ORDERS_QUERY_KEY } from "../mocks/orders";
import { fetchOrders } from "../services/fetch-orders";

export function useOrdersQuery() {
  return useQuery({ queryKey: ORDERS_QUERY_KEY, queryFn: fetchOrders });
}
