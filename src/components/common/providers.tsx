"use client";

import { ThemeProvider } from "@/provider/theme-provider";
import AuthProvider from "@/provider/auth-provider";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import WelcomeBubble from "@/components/common/welcomeBubble";
import { Toaster } from "@/components/ui/sonner";
import CounterProductsProvider from "@/context/countProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <CounterProductsProvider>
            <Navbar />
            <main className="pt-20">
              {children}
              <WelcomeBubble />
            </main>
            <Footer />
            <Toaster richColors position="top-center" />
          </CounterProductsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}