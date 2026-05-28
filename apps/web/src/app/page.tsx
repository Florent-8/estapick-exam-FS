import { FilterBar } from "@/components/filter-bar";
import { getListings } from "@/lib/api";
import { ListingFilters } from "@/lib/types";
import { ListingsAndMap } from "@/components/listings-and-map";

type HomeProps = {
  searchParams: Promise<ListingFilters>;
};

export default async function Home({ searchParams }: HomeProps) {
  const filters = await searchParams;
  const listings = await getListings(filters);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <header className="page-header">
          <div>
            <p>Estapick</p>
            <h1>Property listings</h1>
          </div>
          <span>{listings.meta.total} homes</span>
        </header>
        <div className="hero-panel__filters">
          <FilterBar filters={filters} />
        </div>
      </section>
      <section className="content-shell">
        <ListingsAndMap initial={listings} filters={filters} />
      </section>
    </main>
  );
}
