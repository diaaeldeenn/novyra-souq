"use client";
import { addToCart } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { counterProductContext } from "@/context/countProducts";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function AddToCart({ idProduct }: { idProduct: string }) {
  const [isLoading, setLoading] = useState(false);
  const { handleCart, setNumOfCartItems } = useContext(counterProductContext);
  async function addCart(productID: string) {
    if (isLoading) return;
    setLoading(true);
    try {
      const res = await addToCart(productID);
      toast.success("Product Added Successfully", {
        position: "bottom-left",
      });
      if (typeof res?.numOfCartItems === "number") {
        setNumOfCartItems(res.numOfCartItems);
      } else {
        handleCart();
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-left",
      });
      redirect("/login");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={() => {
          addCart(idProduct);
        }}
        className="cursor-pointer w-full h-11 bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] font-semibold group-hover:scale-105 transition-all"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ShoppingCart className="size-5 ml-2" />
            Add To Cart
          </>
        )}
      </Button>
    </>
  );
}
