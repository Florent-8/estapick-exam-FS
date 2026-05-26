import { Injectable } from "@nestjs/common";
import { ListingsQueryDto } from "./dto/listings-query.dto";
import { Listing, ListingSummary, PaginatedListings } from "./listing.types";
import { listingsSeed } from "./listings.seed";

@Injectable()
export class ListingsRepository {
  private readonly listings = [...listingsSeed].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  findAll(query: ListingsQueryDto): PaginatedListings {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;

    const filtered = this.listings.filter((listing) => {
      if (query.city && listing.city.toLowerCase() !== query.city.toLowerCase()) return false;
      if (query.type && listing.type !== query.type) return false;
      if (query.minPrice !== undefined && listing.price < query.minPrice) return false;
      if (query.maxPrice !== undefined && listing.price > query.maxPrice) return false;
      if (query.bedrooms !== undefined && listing.bedrooms < query.bedrooms) return false;
      if (query.bathrooms !== undefined && listing.bathrooms < query.bathrooms) return false;
      return true;
    });

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit).map(toSummary);

    return {
      data,
      meta: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit))
      }
    };
  }

  findById(id: string): Listing | undefined {
    return this.listings.find((listing) => listing.id === id);
  }
}

function toSummary(listing: Listing): ListingSummary {
  const { description: _description, amenities: _amenities, ...summary } = listing;
  return summary;
}

