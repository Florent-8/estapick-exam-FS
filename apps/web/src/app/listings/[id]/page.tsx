import { ArrowLeft, Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import Link from "next/link";
import { ImageCarousel } from "@/components/image-carousel";
import { formatCurrency, formatType } from "@/lib/format";
import { getListing } from "@/lib/api";

type ListingDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetail({ params }: ListingDetailProps) {
  const { id } = await params;
  const listing = await getListing(id);

  return (
    <main className="detail-shell">
      <Link className="back-link" href="/">
        <ArrowLeft size={18} />
        Back to listings
      </Link>
      <div className="detail-grid">
        <ImageCarousel images={listing.images} title={listing.title} />
        <section className="detail-content">
          <div className="detail-eyebrow">{formatType(listing.type)}</div>
          <h1>{listing.title}</h1>
          <p className="detail-location">
            <MapPin size={16} />
            {listing.address}, {listing.city}
          </p>
          <strong className="detail-price">{formatCurrency(listing.price)}</strong>
          <div className="detail-facts">
            <span>
              <BedDouble size={18} />
              {listing.bedrooms} beds
            </span>
            <span>
              <Bath size={18} />
              {listing.bathrooms} baths
            </span>
            <span>
              <Ruler size={18} />
              {listing.area} m2
            </span>
          </div>
          <p className="detail-description">{listing.description}</p>
          <div className="amenities">
            {listing.amenities.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>
          <div className="detail-map">
            <MapPin size={22} />
            <div>
              <strong>Location</strong>
              <span>
                {listing.latitude.toFixed(4)}, {listing.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
