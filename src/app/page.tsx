"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  Shield,
  Truck,
  Sparkles,
  Star,
  Zap,
  Package,
  CreditCard,
  Award,
  ArrowRight,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const particles = [
    { id: 0, left: 10, top: 20, duration: 3.5, delay: 0.2 },
    { id: 1, left: 25, top: 15, duration: 4.2, delay: 0.5 },
    { id: 2, left: 40, top: 35, duration: 3.8, delay: 1.0 },
    { id: 3, left: 15, top: 50, duration: 4.5, delay: 0.8 },
    { id: 4, left: 30, top: 30, duration: 3.2, delay: 1.5 },
    { id: 5, left: 10, top: 8, duration: 4.0, delay: 0.3 },
    { id: 6, left: 60, top: 10, duration: 3.6, delay: 1.2 },
    { id: 7, left: 70, top: 25, duration: 4.3, delay: 0.7 },
    { id: 8, left: 55, top: 40, duration: 3.9, delay: 1.8 },
    { id: 9, left: 5, top: 55, duration: 4.1, delay: 0.4 },
    { id: 10, left: 75, top: 65, duration: 3.7, delay: 1.4 },
    { id: 11, left: 60, top: 80, duration: 4.4, delay: 0.9 },
    { id: 12, left: 40, top: 70, duration: 3.3, delay: 1.6 },
    { id: 13, left: 80, top: 45, duration: 4.2, delay: 0.6 },
    { id: 14, left: 90, top: 30, duration: 3.8, delay: 1.1 },
  ];

  return (
    <>
      <section
        ref={containerRef}
        className="relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#0D9D9A]/5 via-background to-[#C89B14]/5 dark:from-[#5FD0CD]/5 dark:to-[#F0C75E]/5" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#0D9D9A]/20 dark:bg-[#5FD0CD]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#C89B14]/20 dark:bg-[#F0C75E]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {mounted &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-[#0D9D9A]/30 dark:bg-[#5FD0CD]/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-6 py-20 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-linear-to-r from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-full border border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="size-4 text-[#C89B14] dark:text-[#F0C75E]" />
              </motion.div>
              <span className="text-sm font-bold bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
                New Arrivals Every Week
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
            >
              <motion.span
                className="inline-block bg-linear-to-r from-[#0D9D9A] via-[#C89B14] to-[#0D9D9A] dark:from-[#5FD0CD] dark:via-[#F0C75E] dark:to-[#5FD0CD] bg-clip-text text-transparent drop-shadow-2xl"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                Novyra Souq
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-foreground/80 mb-6"
            >
              Your Premium Shopping Destination
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Discover thousands of premium products with exclusive deals,
              lightning-fast delivery, and unmatched quality. Your next favorite
              item is just a click away.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6"
            >
              <Button
                asChild
                className="group relative overflow-hidden px-12 py-8 text-lg rounded-2xl font-bold bg-linear-to-r from-[#0D9D9A] to-[#087370] dark:from-[#5FD0CD] dark:to-[#3BB9B6] shadow-2xl hover:shadow-[#0D9D9A]/50 dark:hover:shadow-[#5FD0CD]/50 hover:scale-110 transition-all duration-300"
              >
                <Link href={"/products"}>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <ShoppingBag
                    className="mr-2 group-hover:rotate-12 transition-transform"
                    size={24}
                  />
                  <span>Start Shopping</span>
                  <Zap className="ml-2 size-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant={"outline"}
                className="px-12 py-8 text-lg rounded-2xl font-bold border-2 border-[#0D9D9A]/50 dark:border-[#5FD0CD]/50 hover:bg-[#0D9D9A]/10 dark:hover:bg-[#5FD0CD]/10 hover:border-[#0D9D9A] dark:hover:border-[#5FD0CD] hover:scale-105 transition-all duration-300"
              >
                <Link href={"/categories"}>
                  Explore Categories
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            >
              {[
                { value: "1000+", label: "Products" },
                { value: "50K+", label: "Happy Customers" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-4xl font-black bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#0D9D9A] dark:border-[#5FD0CD] rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-[#0D9D9A] dark:bg-[#5FD0CD] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience shopping like never before
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Lightning Fast Delivery",
                description:
                  "Free express shipping on orders over 500 EGP. Get your products delivered within 24-48 hours.",
                delay: 0,
              },
              {
                icon: Shield,
                title: "100% Secure",
                description:
                  "Shop with confidence. All transactions are encrypted and your data is completely protected.",
                delay: 0.2,
              },
              {
                icon: TrendingUp,
                title: "Best Prices Guaranteed",
                description:
                  "Exclusive daily deals and discounts up to 70% off on premium brands and products.",
                delay: 0.4,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden text-center p-10 bg-card rounded-3xl border-2 border-transparent hover:border-[#0D9D9A] dark:hover:border-[#5FD0CD] hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-[#0D9D9A]/5 to-transparent dark:from-[#5FD0CD]/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-2xl mb-6"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="size-10 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                  </motion.div>

                  <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-bl-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              Everything You Need
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Easy Returns",
                description: "30-day hassle-free returns",
              },
              {
                icon: CreditCard,
                title: "Flexible Payment",
                description: "Multiple payment options",
              },
              {
                icon: Award,
                title: "Quality Guarantee",
                description: "100% authentic products",
              },
              {
                icon: Star,
                title: "24/7 Support",
                description: "Always here to help",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-card rounded-2xl border border-border hover:border-[#0D9D9A] dark:hover:border-[#5FD0CD] hover:shadow-lg transition-all duration-300"
              >
                <item.icon className="size-8 text-[#0D9D9A] dark:text-[#5FD0CD] mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#0D9D9A]/10 via-[#C89B14]/10 to-[#0D9D9A]/10 dark:from-[#5FD0CD]/10 dark:via-[#F0C75E]/10 dark:to-[#5FD0CD]/10" />

        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-[#0D9D9A]/20 dark:bg-[#5FD0CD]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-[#C89B14]/20 dark:bg-[#F0C75E]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="size-16 mx-auto mb-6 text-[#C89B14] dark:text-[#F0C75E]" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            <span className="bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              Join 50,000+ Happy Customers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Start your premium shopping experience today and get exclusive
            access to amazing deals
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              asChild
              className="group relative overflow-hidden px-14 py-8 text-xl rounded-2xl font-black bg-linear-to-r from-[#C89B14] to-[#A67F10] dark:from-[#F0C75E] dark:to-[#E0B74E] shadow-2xl hover:shadow-[#C89B14]/50 dark:hover:shadow-[#F0C75E]/50 hover:scale-110 transition-all duration-300"
            >
              <Link href={"/products"}>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "50%" }}
                />
                <span>Start Shopping</span>
                <Sparkles className="ml-2 size-6 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}