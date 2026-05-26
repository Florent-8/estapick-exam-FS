import { FilterBar } from "@/components/filter-bar";
import { ListingCard } from "@/components/listing-card";
import { MapPanel } from "@/components/map-panel";
import { getListings } from "@/lib/api";
import { ListingFilters } from "@/lib/types";

type HomeProps = {
  searchParams: Promise<ListingFilters>;
};

export default async function Home({ searchParams }: HomeProps) {
  const filters = await searchParams;
  const listings = await getListings(filters);

  return (
    <main className="app-shell">
      <section className="results-pane">
        <header className="page-header">
          <div>
            <p>Estapick</p>
            <h1>Property listings</h1>
          </div>
          <span>{listings.meta.total} homes</span>
        </header>
        <FilterBar filters={filters} />
        <div className="listing-list">
          {listings.data.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
      <MapPanel listings={listings.data} />
    </main>
  );
}

