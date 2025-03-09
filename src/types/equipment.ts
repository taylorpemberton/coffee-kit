export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  purchaseDate: string;
  purchaseLocation: string;
  link: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  retailers: RetailerLink[];
  defaultRetailer: string;
  affiliateEnabled: boolean;
}

export interface EquipmentFormData {
  name: string;
  description?: string;
  category: string;
  price: string;
  purchaseDate?: string;
  purchaseLocation?: string;
  link?: string;
  image?: string;
}

export interface AffiliateProgram {
  id: string;
  name: string;  // e.g. "Amazon Associates", "Impact", "Commission Junction"
  baseUrl?: string;
  defaultCommission: number;  // Store as decimal, e.g. 0.04 for 4%
}

export interface AffiliateLink {
  id: string;
  programId: string;
  userId: string;  // The influencer's ID
  productId: string;
  customUrl?: string;  // Custom tracking URL if provided
  promoCode?: string;
  commission: number;  // Override default commission if needed
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RetailerLink {
  retailerId: string;  // e.g. "amazon", "wholelattelove", "seattlecoffee"
  url: string;
  price: number;
  inStock: boolean;
  lastChecked: string;
  affiliateEnabled: boolean;
}

export const EQUIPMENT_CATEGORIES = [
  'Espresso Machine',
  'Grinder',
  'Scale',
  'Tamper',
  'Accessory'
] as const; 