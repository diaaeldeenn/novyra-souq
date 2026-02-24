"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginTypeSchema } from "@/lib/schema/authSchema";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: loginTypeSchema) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response?.ok) {
      router.push("/products");
      toast.success("Logged In Successfully", {
        position: "top-center",
      });
    } else {
      toast.error(response?.error, {
        position: "top-center",
      });
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] rounded-2xl flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-3 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-lg text-muted-foreground">
            Login to continue shopping
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-xl p-8">
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
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
                      placeholder="Enter your password"
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

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Forget Password?{" "}
                <Link
                  className="font-bold text-primary hover:underline"
                  href={"/reset"}
                >
                  Reset Your Password Now!
                </Link>
              </p>
            </div>

            <Button className="cursor-pointer w-full h-12 text-base font-semibold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] transition-all">
              {form.formState.isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                className="font-bold text-primary hover:underline"
                href={"/register"}
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
