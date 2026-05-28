"use client";

import dynamic from "next/dynamic";

type ListingLocationMapProps = {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
};

const ListingLocationMapInner = dynamic(
  () =>
    import("./listing-location-map-inner").then(
      (mod) => mod.ListingLocationMapInner,
    ),
  {
    ssr: false,
    loading: () => <div className="detail-map__loading">Loading map…</div>,
  },
);

export function ListingLocationMap(props: ListingLocationMapProps) {
  return (
    <div className="detail-location-map">
      <ListingLocationMapInner {...props} />
    </div>
  );
}
