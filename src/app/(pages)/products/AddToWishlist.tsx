"use client";
import {
  addToWhishList,
  removeFromWhishList,
  getUserWishlist,
} from "@/actions/whishlist";
import { Spinner } from "@/components/ui/spinner";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

let wishlistIdsCache: Set<string> | null = null;
let wishlistIdsPromise: Promise<Set<string>> | null = null;

async function getWishlistIds(): Promise<Set<string>> {
  if (wishlistIdsCache) return wishlistIdsCache;

  if (!wishlistIdsPromise) {
    wishlistIdsPromise = (async () => {
      const res = await getUserWishlist();
      const ids = new Set<string>((res?.data || []).map((item: any) => item._id));
      wishlistIdsCache = ids;
      return ids;
    })();
  }

  return wishlistIdsPromise;
}

export default function AddToWishlist({idProduct,absolute = false,}:{idProduct: string;absolute?: boolean;}) {


  const [fill, setFill] = useState(false);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const ids = await getWishlistIds();
        setFill(ids.has(idProduct));
      } catch (error) {}
    };
    checkWishlist();
  }, [idProduct]);

  async function addWishlist(productID: string) {
    if (isLoading) return;
    setLoading(true);
    try {
      await addToWhishList(productID);
      wishlistIdsCache?.add(productID);
      setFill(true);
      toast.success("Product Added Successfully", {
        position: "bottom-left",
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-left",
      });
      redirect("/login");
    } finally {
      setLoading(false);
    }
  }

  async function deleteWishList(prodId: string) {
    if (isLoading) return;
    setLoading(true);
    try {
      await removeFromWhishList(prodId);
      wishlistIdsCache?.delete(prodId);
      setFill(false);
      toast.success("Product Deleted Successfully", {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error("Can't Delete Product", {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          fill ? deleteWishList(idProduct) : addWishlist(idProduct);
        }}
        className={`cursor-pointer p-2 bg-white/90 dark:bg-black/90 rounded-full hover:scale-110 transition-transform shadow-lg
                  ${absolute ? "absolute top-3 left-3" : ""}`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Heart
              className={`size-5 text-muted-foreground hover:text-destructive ${fill ? "fill-destructive stroke-destructive" : ""} transition-all`}
            />
          </>
        )}
      </button>
    </>
  );
}
