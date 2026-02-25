import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@/actions/cart.action";
import { CartI } from "@/interfaces/cart";
import { useSession } from "next-auth/react";

export function useCart() {
  const { status } = useSession();

  return useQuery({
    queryKey: ["cart"],
    queryFn: getUserCart,
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (res: CartI) => {
      try {
        if (!res || !res.data) {
          return {
            cartId: "",
            products: [],
            itemsCount: 0,
            subtotal: 0,
            shipping: 50,
            tax: 0,
            total: 50,
          };
        }

        const subtotal = res.data.totalCartPrice || 0;
        const shipping = subtotal > 500 ? 0 : 50;
        const tax = subtotal * 0.14;
        const total = subtotal + shipping + tax;

        return {
          cartId: res.cartId || "",
          products: res.data.products || [],
          itemsCount: res.numOfCartItems || 0,
          subtotal,
          shipping,
          tax,
          total,
        };
      } catch (err) {
        return {
          cartId: "",
          products: [],
          itemsCount: 0,
          subtotal: 0,
          shipping: 50,
          tax: 0,
          total: 50,
        };
      }
    },
  });
}
