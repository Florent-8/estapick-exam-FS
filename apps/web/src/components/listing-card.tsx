"use client";

import { Bath, BedDouble, Home, MapPin, Ruler } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatType } from "@/lib/format";
import { ListingSummary } from "@/lib/types";

type ListingCardProps = {
  listing: ListingSummary;
  selected?: boolean;
};

export function ListingCard({ listing, selected = false }: ListingCardProps) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className={`listing-card ${selected ? "is-selected" : ""}`}
    >
      <div
        className="listing-card__image"
        style={{ backgroundImage: `url(${listing.images[0]})` }}
      />
      <div className="listing-card__body">
        <div className="listing-card__topline">
          <span>{formatType(listing.type)}</span>
          <strong>{formatCurrency(listing.price)}</strong>
        </div>
        <h2>{listing.title}</h2>
        <p>
          <MapPin size={14} />
          {listing.address}, {listing.city}
        </p>
        <div className="listing-card__facts">
          <span>
            <BedDouble size={15} />
            {listing.bedrooms}
          </span>
          <span>
            <Bath size={15} />
            {listing.bathrooms}
          </span>
          <span>
            <Ruler size={15} />
            {listing.area} m2
          </span>
          <span>
            <Home size={15} />
            {formatType(listing.type)}
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          <span className="listing-card__details">View details</span>
        </div>
      </div>
    </Link>
  );
}
