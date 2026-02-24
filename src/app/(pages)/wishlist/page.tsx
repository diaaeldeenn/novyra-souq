"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import WishlistItem from "@/components/wishlist/wishlist-item";
import EmptyWishlist from "@/components/wishlist/empty-wishlist";
import { useEffect, useState } from "react";
import { WishlistCartI, WishlistI } from "@/interfaces/wishlist";
import { getUserWishlist } from "@/actions/whishlist";
import Link from "next/link";

export default function Wishlist() {
  const [pageLoading, setPageLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<WishlistCartI[]>([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res: WishlistI = await getUserWishlist();
        setWishlistItems(res?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    };
    fetchWishlist();
  }, []);
  if (pageLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-linear-to-br from-[#0D9D9A]/5 to-[#C89B14]/5 dark:from-[#5FD0CD]/5 dark:to-[#F0C75E]/5">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-transparent border-t-[#0D9D9A] dark:border-t-[#5FD0CD] rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-lg font-bold bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent animate-pulse">
          Loading your wishlist...
        </p>
      </div>
    );
  }


  const hasItems = wishlistItems.length > 0;

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {hasItems
              ? `You have ${wishlistItems.length} item${
                  wishlistItems.length > 1 ? "s" : ""
                } in your wishlist`
              : "Your wishlist is empty. Start adding items you love!"}
          </p>
        </div>

        {hasItems ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <WishlistItem key={item._id} item={item} />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1">Ready to shop?</h3>
                <p className="text-sm text-muted-foreground">
                  Check Out Your Cart
                </p>
              </div>
              <Link href={"/cart"}>
              <Button
                size="lg"
                className="cursor-pointer px-8 py-6 text-base font-bold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] shadow-lg hover:shadow-xl transition-all"
              >
                Go To Your Cart
                <ShoppingCart className="ml-2" size={20} />
              </Button>
              </Link>
            </div>
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </main>
  );
}
