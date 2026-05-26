import { Injectable, NotFoundException } from "@nestjs/common";
import { ListingsQueryDto } from "./dto/listings-query.dto";
import { Listing, PaginatedListings } from "./listing.types";
import { ListingsRepository } from "./listings.repository";

@Injectable()
export class ListingsService {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  findAll(query: ListingsQueryDto): PaginatedListings {
    return this.listingsRepository.findAll(query);
  }

  findById(id: string): Listing {
    const listing = this.listingsRepository.findById(id);

    if (!listing) {
      throw new NotFoundException(`Listing ${id} was not found`);
    }

    return listing;
  }
}

