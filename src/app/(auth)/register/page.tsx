"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerTypeSchema } from "@/lib/schema/authSchema";
import { register } from "@/services/auth.services";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const form = useForm({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleRegister(values: registerTypeSchema) {
    const resposne = await register(values);
    if (resposne.message == "success") {
      toast.success("Registered Successfully", {
        position: "top-center",
      });
      router.push("/login");
    } else {
      toast.error(resposne.message, {
        position: "top-center",
      });
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] rounded-2xl flex items-center justify-center">
              <UserPlus className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-3 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Join Novyra Souq
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your account and start shopping
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-xl p-8">
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-5"
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Full Name
                  </FieldLabel>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      type="text"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      type="email"
                      className="pl-10 h-12"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid md:grid-cols-2 gap-5">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                      />
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Create password"
                        type="password"
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
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                      />
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm password"
                        type="password"
                        className="pl-10 h-12"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Phone Number
                  </FieldLabel>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your phone number"
                      type="tel"
                      className="pl-10 h-12"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button className="cursor-pointer w-full h-12 text-base font-semibold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] transition-all">
              {form.formState.isSubmitting ? <Spinner /> : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="font-bold text-primary hover:underline"
                href={"/login"}
              >
                Sign In Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
