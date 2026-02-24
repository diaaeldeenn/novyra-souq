"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getUserOrders } from "@/actions/order.action";
import { OrderI } from "@/interfaces/order";
import {
  Package,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";

export default function AllOrders() {
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-linear-to-br from-[#0D9D9A]/5 to-[#C89B14]/5 dark:from-[#5FD0CD]/5 dark:to-[#F0C75E]/5">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-transparent border-t-[#0D9D9A] dark:border-t-[#5FD0CD] rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-lg font-bold bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-screen py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-full flex items-center justify-center">
              <ShoppingBag className="size-16 text-[#0D9D9A] dark:text-[#5FD0CD]" />
            </div>
            <h2 className="text-3xl font-black mb-4">No Orders Yet</h2>
            <Link href={"/products"} className="text-muted-foreground mb-8">
              Start shopping to see your orders here
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            My Orders
          </h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-base px-4 py-2">
              <Package className="size-4 mr-2" />
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </Badge>
          </div>
        </motion.div>


        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300">
                <div className="bg-linear-to-r from-[#0D9D9A]/10 to-[#C89B14]/10 dark:from-[#5FD0CD]/10 dark:to-[#F0C75E]/10 p-6 border-b-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-linear-to-br from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] rounded-xl flex items-center justify-center">
                        <Package className="size-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Order ID
                        </p>
                        <p className="font-bold text-lg">#{order.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant={order.isPaid ? "default" : "secondary"}
                        className={`px-4 py-2 ${
                          order.isPaid
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {order.isPaid ? (
                          <>
                            <CheckCircle2 className="size-4 mr-2" />
                            Paid
                          </>
                        ) : (
                          <>
                            <Clock className="size-4 mr-2" />
                            Pending
                          </>
                        )}
                      </Badge>
                      <Badge
                        variant={order.isDelivered ? "default" : "secondary"}
                        className={`px-4 py-2 ${
                          order.isDelivered
                            ? "bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6]"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        {order.isDelivered ? (
                          <>
                            <Truck className="size-4 mr-2" />
                            Delivered
                          </>
                        ) : (
                          <>
                            <Truck className="size-4 mr-2" />
                            In Transit
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>
                      Placed on {format(new Date(order.createdAt), "PPP")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <MapPin className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                        Shipping Address
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-semibold">City</p>
                            <p className="text-muted-foreground">
                              {order.shippingAddress.city}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-semibold">Details</p>
                            <p className="text-muted-foreground">
                              {order.shippingAddress.details}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-semibold">Phone</p>
                            <p className="text-muted-foreground">
                              {order.shippingAddress.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <CreditCard className="size-5 text-[#C89B14] dark:text-[#F0C75E]" />
                        Payment Info
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Payment Method
                          </span>
                          <span className="font-semibold capitalize">
                            {order.paymentMethodType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span className="font-semibold">
                            {(
                              order.totalOrderPrice -
                              order.shippingPrice -
                              order.taxPrice
                            ).toLocaleString()}{" "}
                            EGP
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span className="font-semibold">
                            {order.shippingPrice > 0
                              ? `${order.shippingPrice} EGP`
                              : "Free"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span className="font-semibold">
                            {order.taxPrice.toFixed(2)} EGP
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-lg">
                          <span className="font-bold">Total</span>
                          <span className="font-black text-[#0D9D9A] dark:text-[#5FD0CD]">
                            {order.totalOrderPrice.toLocaleString()} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <ShoppingBag className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                      Order Items ({order.cartItems.length})
                    </h3>
                    <div className="space-y-3">
                      {order.cartItems.map((item,itemIndex) => (
                        <motion.div
                          key={`${order._id}-${item.product._id}-${itemIndex}`}
                          whileHover={{ scale: 1.02 }}
                          className="flex gap-4 p-4 bg-muted/50 rounded-xl border hover:border-[#0D9D9A]/50 dark:hover:border-[#5FD0CD]/50 transition-all cursor-pointer"
                        >
                          <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden shrink-0">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 right-1 bg-[#0D9D9A] dark:bg-[#5FD0CD] text-white text-xs font-bold px-2 py-1 rounded-full">
                              x{item.count}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold mb-1 truncate">
                              {item.product.title}
                            </h4>
                            <div className="flex items-center gap-2 mb-2 text-xs">
                              <Badge variant="outline" className="text-xs">
                                {item.product.brand.name}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.product.category.name}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {item.price.toLocaleString()} EGP each
                              </span>
                              <span className="font-bold text-[#C89B14] dark:text-[#F0C75E]">
                                {(item.price * item.count).toLocaleString()} EGP
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
