"use client";

import Link from "next/link";

export default function ListingError() {
  return (
    <main className="state-screen">
      <div>
        <p>Listing unavailable</p>
        <h1>We could not load this property.</h1>
        <Link href="/">Back to listings</Link>
      </div>
    </main>
  );
}
