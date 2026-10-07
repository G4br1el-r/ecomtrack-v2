export type ProductStatus = "ativo" | "pausado" | "sem-estoque";

export type ProductChannel = "Mercado Livre" | "Shopify" | "Amazon" | "Site";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  brand: string;
  supplier: string;
  channel: ProductChannel;
  status: ProductStatus;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  sold30d: number;
  rating: number;
  lastSaleAt: string | null;
  createdAt: string;
};
