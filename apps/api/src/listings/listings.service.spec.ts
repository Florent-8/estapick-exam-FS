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
    expect(result.meta.total).toBeGreaterThan(2);
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

    expect(result.data).toHaveLength(2);
    expect(result.data.every((listing) => listing.city === "Tirana")).toBe(true);
    expect(result.data.every((listing) => listing.type === "apartment")).toBe(true);
    expect(result.data.every((listing) => listing.bedrooms >= 2)).toBe(true);
  });

  it("filters by price range", () => {
    const result = service.findAll({ minPrice: 100000, maxPrice: 180000, page: 1, limit: 10 });

    expect(result.data.map((listing) => listing.id)).toEqual(["prop-001", "prop-003"]);
  });

  it("returns a listing by id", () => {
    expect(service.findById("prop-004").title).toContain("Sea-view");
  });

  it("throws when a listing is missing", () => {
    expect(() => service.findById("missing")).toThrow(NotFoundException);
  });
});

