import { MapPin } from "lucide-react";
import { ListingSummary } from "@/lib/types";

type MapPanelProps = {
  listings: ListingSummary[];
  selectedId?: string;
};

export function MapPanel({ listings, selectedId }: MapPanelProps) {
  return (
    <section className="map-panel" aria-label="Listing locations">
      <div className="map-grid" />
      {listings.map((listing, index) => (
        <a
          className={`map-pin ${selectedId === listing.id ? "is-active" : ""}`}
          href={`/?selected=${listing.id}`}
          key={listing.id}
          style={{
            left: `${20 + ((index * 17) % 58)}%`,
            top: `${22 + ((index * 23) % 52)}%`
          }}
          aria-label={listing.title}
        >
          <MapPin size={16} />
        </a>
      ))}
    </section>
  );
}
