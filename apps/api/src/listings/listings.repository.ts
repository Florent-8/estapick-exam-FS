import { Injectable } from "@nestjs/common";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { CreateListingDto } from "./dto/create-listing.dto";
import { ListingsQueryDto } from "./dto/listings-query.dto";
import { Listing, ListingSummary, PaginatedListings } from "./listing.types";
import { listingsSeed } from "./listings.seed";

type ListingRow = Omit<Listing, "images" | "amenities"> & {
  images: string;
  amenities: string;
};

@Injectable()
export class ListingsRepository {
  private readonly db: DatabaseSync;

  constructor() {
    const dbPath =
      process.env.NODE_ENV === "test"
        ? ":memory:"
        : join(process.cwd(), "apps", "api", "data", "estapick.sqlite");

    if (dbPath !== ":memory:") {
      mkdirSync(dirname(dbPath), { recursive: true });
    }

    this.db = new DatabaseSync(dbPath);
    this.initialize();
  }

  findAll(query: ListingsQueryDto): PaginatedListings {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const { where, params } = this.buildWhereClause(query);

    const countRow = this.db
      .prepare(`SELECT COUNT(*) as total FROM listings ${where}`)
      .get(...params) as {
      total: number;
    };
    const start = (page - 1) * limit;
    const rows = this.db
      .prepare(
        `SELECT * FROM listings ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
      )
      .all(...params, limit, start) as ListingRow[];
    const data = rows.map(fromRow).map(toSummary);

    return {
      data,
      meta: {
        total: countRow.total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(countRow.total / limit)),
      },
    };
  }

  findById(id: string): Listing | undefined {
    const row = this.db
      .prepare("SELECT * FROM listings WHERE id = ?")
      .get(id) as ListingRow | undefined;
    return row ? fromRow(row) : undefined;
  }

  create(payload: CreateListingDto): Listing {
    const listing: Listing = {
      ...payload,
      id: this.nextId(),
      createdAt: payload.createdAt ?? new Date().toISOString(),
      amenities: payload.amenities ?? [],
    };

    this.insertListing(listing);
    return listing;
  }

  private initialize(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS listings (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        price INTEGER NOT NULL,
        bedrooms INTEGER NOT NULL,
        bathrooms INTEGER NOT NULL,
        area INTEGER NOT NULL,
        type TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        images TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        description TEXT NOT NULL,
        amenities TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_listings_city ON listings(city);
      CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
      CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
      CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(latitude, longitude);
    `);

    const row = this.db
      .prepare("SELECT COUNT(*) as total FROM listings")
      .get() as { total: number };
    if (row.total === 0) {
      listingsSeed.forEach((listing) => this.insertListing(listing));
    }
  }

  private buildWhereClause(query: ListingsQueryDto): {
    where: string;
    params: unknown[];
  } {
    const clauses: string[] = [];
    const params: unknown[] = [];

    if (query.city) {
      clauses.push("LOWER(city) = LOWER(?)");
      params.push(query.city);
    }
    if (query.type) {
      clauses.push("type = ?");
      params.push(query.type);
    }
    if (query.minPrice !== undefined) {
      clauses.push("price >= ?");
      params.push(query.minPrice);
    }
    if (query.maxPrice !== undefined) {
      clauses.push("price <= ?");
      params.push(query.maxPrice);
    }
    if (query.bedrooms !== undefined) {
      // bedrooms should be an exact match per assignment requirements
      clauses.push("bedrooms = ?");
      params.push(query.bedrooms);
    }
    if (query.bathrooms !== undefined) {
      clauses.push("bathrooms >= ?");
      params.push(query.bathrooms);
    }
    if (query.minLat !== undefined) {
      clauses.push("latitude >= ?");
      params.push(query.minLat);
    }
    if (query.maxLat !== undefined) {
      clauses.push("latitude <= ?");
      params.push(query.maxLat);
    }
    if (query.minLng !== undefined) {
      clauses.push("longitude >= ?");
      params.push(query.minLng);
    }
    if (query.maxLng !== undefined) {
      clauses.push("longitude <= ?");
      params.push(query.maxLng);
    }

    return {
      where: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
      params,
    };
  }

  private insertListing(listing: Listing): void {
    this.db
      .prepare(
        `INSERT INTO listings (
          id, title, city, address, price, bedrooms, bathrooms, area, type,
          latitude, longitude, images, createdAt, description, amenities
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        listing.id,
        listing.title,
        listing.city,
        listing.address,
        listing.price,
        listing.bedrooms,
        listing.bathrooms,
        listing.area,
        listing.type,
        listing.latitude,
        listing.longitude,
        JSON.stringify(listing.images),
        listing.createdAt,
        listing.description,
        JSON.stringify(listing.amenities),
      );
  }

  private nextId(): string {
    const row = this.db
      .prepare("SELECT COUNT(*) as total FROM listings")
      .get() as { total: number };
    return `prop-${String(row.total + 1).padStart(3, "0")}`;
  }
}

function fromRow(row: ListingRow): Listing {
  return {
    ...row,
    images: JSON.parse(row.images) as string[],
    amenities: JSON.parse(row.amenities) as string[],
  };
}

function toSummary(listing: Listing): ListingSummary {
  const {
    description: _description,
    amenities: _amenities,
    ...summary
  } = listing;
  return summary;
}
