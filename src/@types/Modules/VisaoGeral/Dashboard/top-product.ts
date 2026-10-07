export type TopProduct = {
  id: string;
  rank: number;
  name: string;
  sku: string;
  unitsSold: number;
  revenue: number;
  profit: number;
  revenueShare: number;
  profitShare: number;
  ordersShare: number;
};

export type ProductSalesProfile = {
  id: string;
  name: string;
  sku: string;
  dailyUnits: number;
  unitPrice: number;
  unitCost: number;
  ordersPerUnit: number;
};
