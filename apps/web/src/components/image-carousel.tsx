"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type ImageCarouselProps = {
  images: string[];
  title: string;
};

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const active = images[index] ?? images[0];

  return (
    <section className="carousel" aria-label={`${title} photos`}>
      <div className="carousel__image" style={{ backgroundImage: `url(${active})` }} />
      <div className="carousel__controls">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => setIndex((current) => (current === 0 ? images.length - 1 : current - 1))}
        >
          <ChevronLeft size={20} />
        </button>
        <span>
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => setIndex((current) => (current === images.length - 1 ? 0 : current + 1))}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

