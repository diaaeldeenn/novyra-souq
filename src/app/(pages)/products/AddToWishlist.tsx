"use client";
import { addToWhishList, removeFromWhishList } from "@/actions/whishlist";
import { Spinner } from "@/components/ui/spinner";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserWishlist } from "@/actions/whishlist";

export default function AddToWishlist({
  idProduct,
  absolute = false,
}: {
  idProduct: string;
  absolute?: boolean;
}) {
  const [fill, setFill] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await getUserWishlist();
        const isInWishlist = res?.data?.some(
          (item: any) => item._id === idProduct,
        );
        setFill(isInWishlist || false);
      } catch (error) {
        console.log(error);
      }
    };
    checkWishlist();
  }, [idProduct]);

  async function addWishlist(productID: string) {
    setLoading(true);
    try {
      const res = await addToWhishList(productID);
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
    setLoading(true);
    try {
      const res = await removeFromWhishList(prodId);
      setFill(false);
      toast.success("Product Deleted Successfully", {
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
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
