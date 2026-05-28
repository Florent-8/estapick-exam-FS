"use client";

import { useState } from "react";
import { ListingSummary, ListingsResponse, ListingFilters } from "@/lib/types";
import { ListingCard } from "./listing-card";
import { getListings } from "@/lib/api";
import { useSearchParams } from "next/navigation";

type Props = {
  initial: ListingsResponse;
  filters: ListingFilters;
};

export function ListingsList({ initial, filters }: Props) {
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
    </>
  );
}
