"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartProductI } from "@/interfaces/cart";
import { deleteUserItem, updateUserItem } from "@/actions/cart.action";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { counterProductContext } from "@/context/countProducts";

export default function CartItem({ item }: { item: CartProductI }) {
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const queryClient = useQueryClient();
  const { handleCart } = useContext(counterProductContext);

  async function deleteItem(prodId: string) {
    setLoading(true);
    try {
      await deleteUserItem(prodId);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      handleCart();
      toast.success("Product Deleted Successfully", { position: "bottom-left" });
    } catch (error) {
      toast.error("Can't Delete Product", { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(prodId: string, count: number) {
    if (count < 1) {
      await deleteItem(prodId);
      return;
    }
    setUpdating(true);
    try {
      await updateUserItem(prodId, count);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      handleCart();
    } catch (error) {
      toast.error("Failed to update item", { position: "bottom-left" });
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative w-32 h-32 shrink-0 bg-muted rounded-lg overflow-hidden group">
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-primary uppercase mb-1">
                {item.product.brand.name}
              </p>
              <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                {item.product.title}
              </h3>
              <p className="text-2xl font-black text-[#C89B14] dark:text-[#F0C75E]">
                {(item.price * item.count).toLocaleString()}
                <span className="text-sm ml-1">EGP</span>
                <span className="text-gray-400 ms-3 text-[13px]">({item.count} x {item.price})</span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateItem(item.product._id, item.count - 1)}
                  disabled={isUpdating || isLoading}
                  className="cursor-pointer p-2 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/10 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? <Spinner /> : <Minus size={16} />}
                </button>
                <span className="text-lg font-bold w-12 text-center">
                  {item.count}
                </span>
                <button
                  onClick={() => updateItem(item.product._id, item.count + 1)}
                  disabled={isUpdating || isLoading}
                  className="cursor-pointer p-2 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/10 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? <Spinner /> : <Plus size={16} />}
                </button>
              </div>

              <button
                onClick={() => deleteItem(item.product._id)}
                disabled={isLoading || isUpdating}
                className="cursor-pointer p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}