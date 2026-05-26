"use client";

import { RotateCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="state-screen">
      <div>
        <p>Something went wrong</p>
        <h1>We could not load the listings.</h1>
        <button type="button" onClick={reset}>
          <RotateCcw size={18} />
          Try again
        </button>
      </div>
    </main>
  );
}

