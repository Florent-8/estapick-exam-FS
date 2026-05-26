export type PropertyType = "apartment" | "house" | "townhouse" | "villa" | "studio";

export type ListingSummary = {
  id: string;
  title: string;
  city: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: PropertyType;
  latitude: number;
  longitude: number;
  images: string[];
  createdAt: string;
};

export type Listing = ListingSummary & {
  description: string;
  amenities: string[];
};

export type ListingsResponse = {
  data: ListingSummary[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ListingFilters = {
  city?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
};

