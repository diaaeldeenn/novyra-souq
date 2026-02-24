"use client";
import { getUserCart } from "@/actions/cart.action";
import { CartI } from "@/interfaces/cart";
import { createContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface CounterContextType {
  numOfCartItems: number;
  handleCart: () => void;
  setNumOfCartItems: (count: number) => void;
}

export const counterProductContext = createContext<CounterContextType>({
  numOfCartItems: 0,
  handleCart: () => {},
  setNumOfCartItems: () => {},
});

export default function CounterProductsProvider({ children }: { children: React.ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const queryClient = useQueryClient();

  async function handleCart() {
    const res: CartI = await getUserCart();
    const total = res?.data?.products?.reduce((accu, prod) => prod.count + accu, 0) || 0;
    setNumOfCartItems(total);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <counterProductContext.Provider value={{ numOfCartItems, handleCart, setNumOfCartItems }}>
      {children}
    </counterProductContext.Provider>
  );
}