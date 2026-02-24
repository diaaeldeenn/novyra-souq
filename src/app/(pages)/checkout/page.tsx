"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressCheckoutSchema,
  AddressCheckoutTypeSchema,
} from "@/lib/schema/addressSchema";
import {
  Home,
  MapPin,
  Phone,
  CreditCard,
  Wallet,
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import CartSummary from "@/components/cart/cart-summary";
import { createCashOrder, createOnlineOrder } from "@/actions/order.action";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const { data: cart } = useCart();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(addressCheckoutSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
    },
  });

  async function handleCheckout(values: AddressCheckoutTypeSchema) {
    const response = await createCashOrder(cart?.cartId ?? "", values);

    if (response.status == "success") {
      toast.success("Order Placed Successfully", { position: "top-center" });
      router.push("/allorders");
    } else {
      toast.error(response.message || "Something went wrong", {
        position: "top-center",
      });
    }
  }


  async function handleOnlineCheckout(values: AddressCheckoutTypeSchema) {
    const response = await createOnlineOrder(cart?.cartId ?? "", values);
    if (response.status == "success") {
      toast.success("Order Placed Successfully", { position: "top-center" });
      window.location.href = response.session.url
    } else {
      toast.error(response.message || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <main className="min-h-screen py-12 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 cursor-pointer">
            <Link href="/cart" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Cart
            </Link>
          </Button>

          <h1 className="text-4xl font-black mb-2 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Complete Your Order
          </h1>
          <p className="text-muted-foreground">
            Review and complete your purchase
          </p>
        </div>

        <form onSubmit={form.handleSubmit(selectedPayment === "online" ? handleOnlineCheckout : handleCheckout)}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-xl flex items-center justify-center">
                    <Home className="size-6 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Shipping Address</h2>
                    <p className="text-sm text-muted-foreground">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
                <div className="mb-6 p-4 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 border border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#0D9D9A] dark:text-[#5FD0CD] mb-1">
                      Delivery Information
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-semibold"
                        >
                          City *
                        </FieldLabel>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. Cairo, Alexandria, Giza"
                            className="pl-10 h-12"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-semibold"
                        >
                          Street Address *
                        </FieldLabel>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Street name, building, floor..."
                            className="pl-10 h-12"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-semibold"
                        >
                          Phone Number *
                        </FieldLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id={field.name}
                            type="tel"
                            aria-invalid={fieldState.invalid}
                            placeholder="01xxxxxxxxx"
                            className="pl-10 h-12"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Egyptian only
                        </p>
                      </Field>
                    )}
                  />
                </div>
              </Card>
              <Card className="p-6 border-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-[#C89B14]/20 to-[#A67F10]/20 dark:from-[#F0C75E]/20 dark:to-[#E0B74E]/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="size-6 text-[#C89B14] dark:text-[#F0C75E]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Payment Method</h2>
                    <p className="text-sm text-muted-foreground">
                      Choose how you'd like to pay
                    </p>
                  </div>
                </div>

                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                >
                  <div className="space-y-4">
                    <label
                      htmlFor="cash"
                      className={`cursor-pointer flex items-center gap-4 p-5 border-2 rounded-xl transition-all ${
                        selectedPayment === "cash"
                          ? "border-[#0D9D9A] dark:border-[#5FD0CD] bg-[#0D9D9A]/5 dark:bg-[#5FD0CD]/5"
                          : "border-border hover:border-[#0D9D9A]/50 dark:hover:border-[#5FD0CD]/50"
                      }`}
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-lg flex items-center justify-center">
                          <Wallet className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">Cash on Delivery</p>
                          <p className="text-xs text-muted-foreground">
                            Pay when your order arrives
                          </p>
                        </div>
                        {selectedPayment === "cash" && (
                          <CheckCircle2 className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                        )}
                      </div>
                    </label>
                    <label
                      htmlFor="online"
                      className={`cursor-pointer flex items-center gap-4 p-5 border-2 rounded-xl transition-all ${
                        selectedPayment === "online"
                          ? "border-[#0D9D9A] dark:border-[#5FD0CD] bg-[#0D9D9A]/5 dark:bg-[#5FD0CD]/5"
                          : "border-border hover:border-[#0D9D9A]/50 dark:hover:border-[#5FD0CD]/50"
                      }`}
                    >
                      <RadioGroupItem value="online" id="online" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-[#C89B14]/10 dark:bg-[#F0C75E]/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="size-5 text-[#C89B14] dark:text-[#F0C75E]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">Pay Online</p>
                          <p className="text-xs text-muted-foreground">
                            Secure payment via Stripe
                          </p>
                        </div>
                        {selectedPayment === "online" && (
                          <CheckCircle2 className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                        )}
                      </div>
                    </label>
                    {selectedPayment === "online" && (
                      <div className="pl-16 flex gap-2 items-center">
                        <div className="w-10 h-7 bg-muted rounded flex items-center justify-center text-xs font-bold">
                          VISA
                        </div>
                        <div className="w-10 h-7 bg-muted rounded flex items-center justify-center text-xs font-bold">
                          MC
                        </div>
                        <div className="w-10 h-7 bg-muted rounded flex items-center justify-center text-xs font-bold">
                          AE
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>
                <div className="mt-6 p-4 bg-[#C89B14]/10 dark:bg-[#F0C75E]/10 border border-[#C89B14]/30 dark:border-[#F0C75E]/30 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="size-5 text-[#C89B14] dark:text-[#F0C75E] shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-bold text-[#C89B14] dark:text-[#F0C75E]">
                      Secure & Encrypted
                    </span>{" "}
                    - 256-bit SSL encryption
                  </p>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <CartSummary
                  itemsCount={cart?.itemsCount ?? 0}
                  subtotal={cart?.subtotal ?? 0}
                  shipping={cart?.shipping ?? 0}
                  tax={cart?.tax ?? 0}
                  total={cart?.total ?? 0}
                  cartId={cart?.cartId ?? ""}
                  hideCheckoutButton={true}
                />
                <Button className="cursor-pointer w-full h-14 text-lg font-bold bg-linear-to-r from-[#0D9D9A] to-[#087370] dark:from-[#5FD0CD] dark:to-[#3BB9B6] hover:scale-105 transition-all duration-300 shadow-xl mt-6">
                  <Truck className="size-5 mr-2" />
                  Proceed to Payment
                </Button>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-3 bg-card border rounded-xl">
                    <ShieldCheck className="size-6 mx-auto mb-1 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                    <p className="text-xs font-bold">Secure</p>
                  </div>
                  <div className="text-center p-3 bg-card border rounded-xl">
                    <Truck className="size-6 mx-auto mb-1 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                    <p className="text-xs font-bold">Fast Delivery</p>
                  </div>
                  <div className="text-center p-3 bg-card border rounded-xl">
                    <CheckCircle2 className="size-6 mx-auto mb-1 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                    <p className="text-xs font-bold">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
