export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  occasion: string[];
  imageUrls: string[];
  personalised: boolean;
  featured: boolean;
  active: boolean;
};

// No sample products are published as real stock. The catalogue is populated
// only from the connected ONE O database and owner-approved product records.
export const demoProducts: Product[] = [];
