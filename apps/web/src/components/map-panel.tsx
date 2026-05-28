"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter, useSearchParams } from "next/navigation";
import { ListingSummary } from "@/lib/types";

type MapPanelProps = {
  listings: ListingSummary[];
  selectedId?: string;
};

// Fix Leaflet default icon paths (use CDN hosted images)
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapEvents({
  onBBox,
}: {
  onBBox: (bbox: {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handle = () => {
      const bounds = map.getBounds();
      onBBox({
        minLat: bounds.getSouth(),
        minLng: bounds.getWest(),
        maxLat: bounds.getNorth(),
        maxLng: bounds.getEast(),
      });
    };

    map.on("moveend", handle);
    return () => map.off("moveend", handle);
  }, [map, onBBox]);

  return null;
}

export function MapPanel({ listings, selectedId }: MapPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapRef = useRef<any>(null);

  const center = useMemo(() => {
    if (listings.length === 0) return [41.32, 19.8];
    const avgLat =
      listings.reduce((s, l) => s + l.latitude, 0) / listings.length;
    const avgLng =
      listings.reduce((s, l) => s + l.longitude, 0) / listings.length;
    return [avgLat, avgLng];
  }, [listings]);

  useEffect(() => {
    if (!mapRef.current || listings.length === 0) return;
    const map = mapRef.current;
    try {
      const bounds = L.latLngBounds(
        listings.map((l) => [l.latitude, l.longitude] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [40, 40] });
    } catch (e) {
      // ignore
    }
  }, [listings]);

  const handleBBox = (bbox: {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  }) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("minLat", String(bbox.minLat));
    params.set("minLng", String(bbox.minLng));
    params.set("maxLat", String(bbox.maxLat));
    params.set("maxLng", String(bbox.maxLng));
    // preserve other params (city, type, etc.)
    router.push(`/?${params.toString()}`);
  };

  const handleMarkerClick = (id: string, lat: number, lng: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("selected", id);
    router.push(`/?${params.toString()}`);
    if (mapRef.current) mapRef.current.setView([lat, lng], 15);
  };

  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const target = listings.find((l) => l.id === selectedId);
    if (!target) return;
    try {
      mapRef.current.setView([target.latitude, target.longitude], 15);
      L.popup({ maxWidth: 320 })
        .setLatLng([target.latitude, target.longitude])
        .setContent(
          `<strong>${target.title}</strong><div>${target.address}, ${target.city}</div>`,
        )
        .openOn(mapRef.current);
    } catch (e) {
      // ignore
    }
  }, [selectedId, listings]);

  return (
    <section className="map-panel" aria-label="Listing locations">
      <div className="map-panel__frame">
        <MapContainer
          center={center as [number, number]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents onBBox={handleBBox} />
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.latitude, listing.longitude]}
              eventHandlers={{
                click: () =>
                  handleMarkerClick(
                    listing.id,
                    listing.latitude,
                    listing.longitude,
                  ),
              }}
            >
              <Popup>
                <strong>{listing.title}</strong>
                <div>
                  {listing.address}, {listing.city}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
