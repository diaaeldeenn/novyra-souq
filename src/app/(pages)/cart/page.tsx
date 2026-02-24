"use client";
import { clearUserItem } from "@/actions/cart.action";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { counterProductContext } from "@/context/countProducts";

export default function Cart() {
  const [isClearing, setIsClearing] = useState(false);
  const { data: cart, isLoading } = useCart();
  const queryClient = useQueryClient();
  const { handleCart } = useContext(counterProductContext);

  async function clearProducts() {
    setIsClearing(true);
    try {
      await clearUserItem();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      handleCart();
      toast.success("Cart Cleared Successfully");
    } catch (error) {
      toast.error("Can't Clear Cart");
    } finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-linear-to-br from-[#0D9D9A]/5 to-[#C89B14]/5 dark:from-[#5FD0CD]/5 dark:to-[#F0C75E]/5">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-transparent border-t-[#0D9D9A] dark:border-t-[#5FD0CD] rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-lg font-bold bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  const hasItems = (cart?.itemsCount ?? 0) > 0;

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {hasItems
              ? "Review your items and proceed to checkout"
              : "Your shopping cart is waiting for amazing products"}
          </p>
        </div>

        {hasItems ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart?.products.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
              <div className="flex justify-end mb-6">
                <Button
                  onClick={clearProducts}
                  variant="outline"
                  className="border-3 cursor-pointer hover:text-white border-destructive/50 text-destructive hover:bg-destructive font-bold transition-all hover:shadow-lg"
                >
                  {isClearing ? (
                    <Spinner />
                  ) : (
                    <>
                      <Trash2 className="mr-2" size={18} />
                      Clear All
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <CartSummary
                itemsCount={cart?.itemsCount ?? 0}
                subtotal={cart?.subtotal ?? 0}
                shipping={cart?.shipping ?? 0}
                tax={cart?.tax ?? 0}
                total={cart?.total ?? 0}
                cartId={cart?.cartId ?? ""}
              />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </main>
  );
}