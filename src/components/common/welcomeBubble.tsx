"use client";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function WelcomeBubble() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") return null;

  const isLoggedIn = !!session?.user;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-xs rounded-2xl bg-linear-to-br from-[#0D9D9A] to-[#0A7F7C] dark:from-[#ffbf00] dark:to-[#ecb100] p-5 text-white shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-2 right-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
            {isLoggedIn ? (
              <div>
                <p className="font-bold text-lg mb-1">Welcome Back! 👋</p>
                <p className="text-white/90 text-sm">{session?.user?.name}</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-lg mb-2">Welcome to Novyra! 👋</p>
                <p className="text-white/90 text-sm mb-3">
                  Sign up now to get exclusive deals and offers
                </p>
                <Link
                  href="/register"
                  className="inline-block bg-white text-[#0D9D9A] dark:text-[#ffbf00] px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/90 transition-all"
                >
                  Create Account
                </Link>
              </div>
            )}
            <span className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-linear-to-br from-[#0D9D9A] to-[#0A7F7C] dark:from-[#ffbf00] dark:to-[#ecb100]" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0D9D9A] to-[#0A7F7C] dark:from-[#ffbf00] dark:to-[#ecb100] text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
