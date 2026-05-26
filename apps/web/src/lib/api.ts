import { Listing, ListingFilters, ListingsResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getListings(filters: ListingFilters = {}): Promise<ListingsResponse> {
  const search = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });

  const response = await fetch(`${API_BASE_URL}/listings?${search.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to load listings");
  }

  return response.json();
}

export async function getListing(id: string): Promise<Listing> {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to load listing");
  }

  return response.json();
}

