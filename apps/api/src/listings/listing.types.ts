export type PropertyType = "apartment" | "house" | "townhouse" | "villa" | "studio";

export type Listing = {
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
  description: string;
  amenities: string[];
};

export type ListingSummary = Omit<Listing, "description" | "amenities">;

export type PaginatedListings = {
  data: ListingSummary[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

