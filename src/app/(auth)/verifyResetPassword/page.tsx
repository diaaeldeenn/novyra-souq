"use client";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Shield } from "lucide-react";
import { verifyResetCode } from "@/services/auth.services";
import Link from "next/link";

export default function VerifyResetPassword() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleVerifyOTP() {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code", {
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await verifyResetCode(otp);

      if (data?.status === "Success") {
        toast.success("Code verified successfully!", {
          position: "top-right",
        });
        router.push("/enterResetPassword");
      } else {
        toast.error(data?.message || "Invalid code. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="fixed top-20 left-10 w-96 h-96 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-[#C89B14]/10 dark:bg-[#F0C75E]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card/50 backdrop-blur-sm border-2 border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-2xl flex items-center justify-center">
              <Shield className="size-10 text-[#0D9D9A] dark:text-[#5FD0CD]" />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-3 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              Verify Your Code
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter the 6-digit code we sent to your email
            </p>
          </div>
          <div className="mb-8">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot 
                    index={0} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                  <InputOTPSlot 
                    index={1} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                  <InputOTPSlot 
                    index={2} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                  <InputOTPSlot 
                    index={3} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                  <InputOTPSlot 
                    index={4} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                  <InputOTPSlot 
                    index={5} 
                    className="w-14 h-14 text-2xl font-bold border-2 border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 focus:border-[#0D9D9A] dark:focus:border-[#5FD0CD] rounded-xl"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              {otp.length}/6 digits entered
            </p>
          </div>
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
            className="cursor-pointer w-full py-6 text-lg font-bold bg-linear-to-r from-[#0D9D9A] to-[#087370] dark:from-[#5FD0CD] dark:to-[#3BB9B6] hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Verify Code</span>
                <Sparkles className="size-5" />
              </div>
            )}
          </Button>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <Link href={"/reset"} className="cursor-pointer text-[#0D9D9A] dark:text-[#5FD0CD] font-bold hover:underline">
                Resend Code
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}