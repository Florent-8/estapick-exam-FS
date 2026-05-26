import { NotFoundException } from "@nestjs/common";
import { ListingsRepository } from "./listings.repository";
import { ListingsService } from "./listings.service";

describe("ListingsService", () => {
  let service: ListingsService;

  beforeEach(() => {
    service = new ListingsService(new ListingsRepository());
  });

  it("returns paginated listings with metadata", () => {
    const result = service.findAll({ page: 1, limit: 2 });

    expect(result.data).toHaveLength(2);
    expect(result.meta.total).toBe(18);
    expect(result.meta.totalPages).toBeGreaterThan(1);
  });

  it("filters by city, type and minimum bedrooms", () => {
    const result = service.findAll({
      city: "Tirana",
      type: "apartment",
      bedrooms: 2,
      page: 1,
      limit: 10
    });

    expect(result.data).toHaveLength(4);
    expect(result.data.every((listing) => listing.city === "Tirana")).toBe(true);
    expect(result.data.every((listing) => listing.type === "apartment")).toBe(true);
    expect(result.data.every((listing) => listing.bedrooms >= 2)).toBe(true);
  });

  it("filters by price range", () => {
    const result = service.findAll({ minPrice: 100000, maxPrice: 180000, page: 1, limit: 10 });

    expect(result.data).toHaveLength(7);
    expect(result.data.every((listing) => listing.price >= 100000 && listing.price <= 180000)).toBe(true);
  });

  it("filters by bounding box", () => {
    const result = service.findAll({
      minLat: 41.3,
      maxLat: 41.36,
      minLng: 19.43,
      maxLng: 19.5,
      page: 1,
      limit: 20
    });

    expect(result.data).toHaveLength(5);
    expect(result.data.every((listing) => listing.city === "Durres")).toBe(true);
  });

  it("returns a listing by id", () => {
    expect(service.findById("prop-004").title).toContain("Sea-view");
  });

  it("throws when a listing is missing", () => {
    expect(() => service.findById("missing")).toThrow(NotFoundException);
  });

  it("creates a listing with generated id and timestamp fallback", () => {
    const created = service.create({
      title: "New test home",
      description: "A manually submitted listing.",
      price: 100000,
      city: "Tirana",
      address: "Test street",
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      type: "apartment",
      latitude: 41.33,
      longitude: 19.82,
      images: ["https://example.com/home.jpg"]
    });

    expect(created.id).toMatch(/^prop-/);
    expect(created.createdAt).toBeTruthy();
    expect(service.findById(created.id).title).toBe("New test home");
  });
});
