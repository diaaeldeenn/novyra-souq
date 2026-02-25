"use client";
import {
  addToWhishList,
  removeFromWhishList,
  getUserWishlist,
} from "@/actions/whishlist";
import { Spinner } from "@/components/ui/spinner";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddToWishlist({idProduct,absolute = false,}: {idProduct: string;absolute?: boolean;}) {
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getUserWishlist,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const wishlistIds = useMemo(
    () => new Set<string>((data?.data || []).map((item: any) => item._id)),
    [data],
  );

  const fill = wishlistIds.has(idProduct);

  async function addWishlist(productID: string) {
    if (isLoading) return;
    setLoading(true);
    try {
      await addToWhishList(productID);
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Product Added Successfully", { position: "bottom-left" });
    } catch (error: any) {
      toast.error(error.message, { position: "bottom-left" });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  async function deleteWishList(prodId: string) {
    if (isLoading) return;
    setLoading(true);
    try {
      await removeFromWhishList(prodId);
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Product Deleted Successfully", {
        position: "bottom-left",
      });
    } catch {
      toast.error("Can't Delete Product", { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={() =>
        fill ? deleteWishList(idProduct) : addWishlist(idProduct)
      }
      className={`cursor-pointer p-2 bg-white/90 dark:bg-black/90 rounded-full hover:scale-110 transition-transform shadow-lg ${
        absolute ? "absolute top-3 left-3" : ""
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Heart
          className={`size-5 text-muted-foreground hover:text-destructive ${
            fill ? "fill-destructive stroke-destructive" : ""
          } transition-all`}
        />
      )}
    </button>
  );
}
