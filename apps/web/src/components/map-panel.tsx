import { MapPin } from "lucide-react";
import { ListingSummary } from "@/lib/types";

type MapPanelProps = {
  listings: ListingSummary[];
};

export function MapPanel({ listings }: MapPanelProps) {
  return (
    <section className="map-panel" aria-label="Listing locations">
      <div className="map-grid" />
      {listings.map((listing, index) => (
        <a
          className="map-pin"
          href={`/listings/${listing.id}`}
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

