"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: string[];
  title: string;
}

export default function ProductImageCarousel({images,title,}: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToImage = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-2">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-125 bg-muted">
                  <Image
                    fill
                    className="object-contain p-8"
                    src={img}
                    alt={`${title} - Image ${index + 1}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 cursor-pointer" />
          <CarouselNext className="right-4 cursor-pointer" />
        </Carousel>
      </Card>

      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((img, index) => (
          <div
            key={index}
            onClick={() => scrollToImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              current === index
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-muted hover:border-primary"
            }`}
          >
            <Image
              fill
              className="object-cover"
              src={img}
              alt={`${title} thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
