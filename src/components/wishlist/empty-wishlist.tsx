import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <Card className="max-w-2xl mx-auto text-center py-16 border-2">
      <CardContent className="space-y-6">
        <div className="w-32 h-32 mx-auto bg-linear-to-br from-[#0D9D9A]/10 to-[#C89B14]/10 dark:from-[#5FD0CD]/10 dark:to-[#F0C75E]/10 rounded-full flex items-center justify-center">
          <Heart size={64} className="text-muted-foreground" />
        </div>

        <div>
          <h2 className="text-3xl font-black mb-3">Your wishlist is empty</h2>
          <p className="text-muted-foreground text-lg mb-6">
            Save items you love for later. Start adding to your wishlist!
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="px-10 py-6 text-lg font-bold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          <Link href="/products">
            Explore Products
            <ShoppingCart className="ml-2" size={24} />
          </Link>
        </Button>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
          <div className="text-center">
            <p className="text-2xl font-black text-primary mb-1">1000+</p>
            <p className="text-xs text-muted-foreground">Products</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-primary mb-1">50+</p>
            <p className="text-xs text-muted-foreground">Brands</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-primary mb-1">
              <Heart className="inline-block" size={24} />
            </p>
            <p className="text-xs text-muted-foreground">Save Items</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}