"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
        {children}
      </SessionProvider>
    </div>
  );
}
