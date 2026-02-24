"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { CartSummaryPropsI } from "@/interfaces/cart";
import { useState } from "react";

export default function CartSummary({
  itemsCount,
  subtotal,
  shipping,
  tax,
  total,
  hideCheckoutButton = false,
}: CartSummaryPropsI) {
  const [couponCode, setCouponCode] = useState("");

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <h2 className="text-2xl font-bold">Order Summary</h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({itemsCount} {itemsCount === 1 ? "item" : "items"})
              </span>
              <span className="font-semibold">
                {subtotal.toLocaleString()} EGP
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">
                {shipping > 0 ? `${shipping} EGP` : "Free"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (14%)</span>
              <span className="font-semibold">{tax.toFixed(2)} EGP</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black text-[#C89B14] dark:text-[#F0C75E]">
                {total.toFixed(2)}
                <span className="text-sm ml-1">EGP</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  className="flex-1"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="border-2 hover:border-primary hover:bg-primary/10"
                  disabled={!couponCode}
                >
                  <Tag size={18} />
                </Button>
              </div>

              {!hideCheckoutButton && (
                <Button
                  asChild
                  className="cursor-pointer w-full h-12 text-base font-bold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] shadow-lg hover:shadow-xl transition-all"
                  disabled={itemsCount === 0}
                >
                  <Link
                    href={"/checkout"}
                    className="flex items-center justify-center"
                  >
                    Proceed To Checkout
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="hover:dark:text-[#0D9D9A] w-full h-12 text-base font-semibold border-2  hover:border-primary"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On orders over 500 EGP
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
