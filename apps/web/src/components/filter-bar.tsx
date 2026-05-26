import { Search } from "lucide-react";
import { ListingFilters } from "@/lib/types";

type FilterBarProps = {
  filters: ListingFilters;
};

export function FilterBar({ filters }: FilterBarProps) {
  return (
    <form className="filter-bar">
      <label>
        <span>City</span>
        <select name="city" defaultValue={filters.city ?? ""}>
          <option value="">Any city</option>
          <option value="Tirana">Tirana</option>
          <option value="Durres">Durres</option>
          <option value="Vlore">Vlore</option>
        </select>
      </label>
      <label>
        <span>Type</span>
        <select name="type" defaultValue={filters.type ?? ""}>
          <option value="">Any type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
          <option value="studio">Studio</option>
        </select>
      </label>
      <label>
        <span>Min price</span>
        <input name="minPrice" inputMode="numeric" placeholder="80000" defaultValue={filters.minPrice ?? ""} />
      </label>
      <label>
        <span>Max price</span>
        <input name="maxPrice" inputMode="numeric" placeholder="250000" defaultValue={filters.maxPrice ?? ""} />
      </label>
      <label>
        <span>Beds</span>
        <input name="bedrooms" inputMode="numeric" placeholder="2" defaultValue={filters.bedrooms ?? ""} />
      </label>
      <label>
        <span>Baths</span>
        <input name="bathrooms" inputMode="numeric" placeholder="1" defaultValue={filters.bathrooms ?? ""} />
      </label>
      <button type="submit" aria-label="Search listings">
        <Search size={18} />
        Search
      </button>
    </form>
  );
}
