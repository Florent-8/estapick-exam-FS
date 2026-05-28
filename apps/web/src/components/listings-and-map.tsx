"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ListingSummary, ListingsResponse, ListingFilters } from "@/lib/types";
import { ListingCard } from "./listing-card";
import { getListings } from "@/lib/api";
import { useSearchParams } from "next/navigation";

const MapPanel = dynamic(
  () => import("./map-panel").then((mod) => mod.MapPanel),
  {
    ssr: false,
    loading: () => (
      <section className="map-panel" aria-label="Listing locations">
        <div style={{ padding: 24 }}>Loading map…</div>
      </section>
    ),
  },
);

type Props = {
  initial: ListingsResponse;
  filters: ListingFilters;
};

export function ListingsAndMap({ initial, filters }: Props) {
  const [listings, setListings] = useState<ListingSummary[]>(initial.data);
  const [meta, setMeta] = useState(initial.meta);
  const [page, setPage] = useState(initial.meta.page);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const selected = searchParams.get("selected") ?? undefined;

  const loadMore = async () => {
    if (loading) return;
    const next = page + 1;
    setLoading(true);
    try {
      const res = await getListings({ ...filters, page: String(next) });
      setListings((s) => [...s, ...res.data]);
      setMeta(res.meta);
      setPage(res.meta.page);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="results-pane">
        <div className="listing-list">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} selected={selected === l.id} />
          ))}
        </div>
        {meta.page < meta.totalPages && (
          <div style={{ padding: 16, textAlign: "center" }}>
            <button onClick={loadMore} disabled={loading}>
              {loading ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </section>
      <MapPanel listings={listings} selectedId={selected} />
    </>
  );
}
