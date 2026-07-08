export interface IGearItemPayload {
  categoryId: string;
  userId: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  totalQuantity: number,
  availableQuantity: number
};

export interface IGearQuery {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  available?: string;
}

export interface IGearItemUpdatePayload {
  categoryId?: string;
  userId?: string;
  name?: string;
  brand?: string;
  price?: number;
  description?: string;
  totalQuantity?: number,
  availableQuantity?: number
}