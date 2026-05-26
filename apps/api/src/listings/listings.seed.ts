import { Listing } from "./listing.types";

export const listingsSeed: Listing[] = [
  {
    id: "prop-001",
    title: "Garden apartment near Komuna e Parisit",
    city: "Tirana",
    address: "Rruga Medar Shtylla",
    price: 118000,
    bedrooms: 2,
    bathrooms: 1,
    area: 84,
    type: "apartment",
    latitude: 41.317,
    longitude: 19.806,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-18T09:00:00.000Z",
    description:
      "Bright two-bedroom apartment with a renovated kitchen, leafy balcony, and quick access to cafes, schools, and Unaza.",
    amenities: ["Balcony", "Elevator", "Renovated kitchen", "South-facing"]
  },
  {
    id: "prop-002",
    title: "Minimal studio by the New Bazaar",
    city: "Tirana",
    address: "Pazari i Ri",
    price: 72000,
    bedrooms: 0,
    bathrooms: 1,
    area: 42,
    type: "studio",
    latitude: 41.3308,
    longitude: 19.8253,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-17T12:20:00.000Z",
    description:
      "Compact city studio designed for short commutes, with practical storage and a warm interior palette.",
    amenities: ["Furnished", "Air conditioning", "Walkable location"]
  },
  {
    id: "prop-003",
    title: "Family house with courtyard",
    city: "Durres",
    address: "Shkozet",
    price: 165000,
    bedrooms: 3,
    bathrooms: 2,
    area: 148,
    type: "house",
    latitude: 41.3221,
    longitude: 19.4557,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-16T15:30:00.000Z",
    description:
      "Detached home with a shaded courtyard, secure parking, and flexible rooms for a growing family.",
    amenities: ["Private parking", "Courtyard", "Storage", "Two floors"]
  },
  {
    id: "prop-004",
    title: "Sea-view villa in Vlore",
    city: "Vlore",
    address: "Uji i Ftohte",
    price: 420000,
    bedrooms: 4,
    bathrooms: 3,
    area: 260,
    type: "villa",
    latitude: 40.438,
    longitude: 19.495,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-14T10:10:00.000Z",
    description:
      "Elevated villa with full Adriatic views, generous terraces, and an open living area for hosting.",
    amenities: ["Sea view", "Terrace", "Garage", "Fireplace"]
  },
  {
    id: "prop-005",
    title: "Townhouse close to the lake",
    city: "Tirana",
    address: "Liqeni Artificial",
    price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    area: 156,
    type: "townhouse",
    latitude: 41.3126,
    longitude: 19.8165,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-12T08:30:00.000Z",
    description:
      "Quiet townhouse with split-level living, a small patio, and fast access to the lake park.",
    amenities: ["Patio", "Park access", "Dedicated parking", "Laundry room"]
  },
  {
    id: "prop-006",
    title: "Modern apartment in Blloku",
    city: "Tirana",
    address: "Rruga Abdyl Frasheri",
    price: 198000,
    bedrooms: 2,
    bathrooms: 2,
    area: 96,
    type: "apartment",
    latitude: 41.3209,
    longitude: 19.8186,
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    createdAt: "2026-05-10T11:45:00.000Z",
    description:
      "Well-finished apartment in one of Tirana's most active neighborhoods, with two full bathrooms and city views.",
    amenities: ["City view", "Elevator", "Security", "Central heating"]
  }
];

