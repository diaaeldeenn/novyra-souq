"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Fragment } from "react";
import { WishlistCartI } from "@/interfaces/wishlist";
import AddToCart from "@/app/(pages)/products/AddToCart";
import AddToWishlist from "@/app/(pages)/products/AddToWishlist";

export default function WishlistItem({ item }: { item: WishlistCartI }) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50">
      
      <div className="relative overflow-hidden bg-muted">
        <Link href={`/products/${item._id}`} className="group">
          <Image
            width={400}
            height={400}
            src={item.imageCover}
            alt={item.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        <AddToWishlist idProduct={item._id} absolute/>
      </div>

      <CardContent className="p-4">
        <p className="text-xs font-semibold text-primary uppercase mb-1">
          {item.brand.name}
        </p>

        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {item.title}
        </h3>

        <p className="text-xs text-muted-foreground mb-3">
          {item.category.name}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {[0, 1, 2, 3, 4].map((star, index) => {
            const filled = star < Math.floor(item.ratingsAverage);
            return (
              <Fragment key={index}>
                <Star
                  className={`size-4 ${
                    filled
                      ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]"
                      : "text-muted fill-muted"
                  }`}
                />
              </Fragment>
            );
          })}
          <span className="text-sm font-bold ml-1 text-muted-foreground">
            {item.ratingsAverage}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            ({item.ratingsQuantity})
          </span>
        </div>

        <p className="text-2xl font-black text-[#C89B14] dark:text-[#F0C75E]">
          {item.price}
          <span className="text-sm ml-1">EGP</span>
        </p>
      </CardContent>

      <CardFooter>
        <AddToCart idProduct={item._id} />
      </CardFooter>
    </Card>
  );
}
