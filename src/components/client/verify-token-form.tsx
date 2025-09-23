"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingLutton from "../loading-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const VerifyOTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [value, setValue] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: value, token }),
    });
    const result = await res.json();
    if (result.success) {
      setValue("");
      toast.success(result?.message);
      router.push(`/login`);
    } else if (result.errors) {
      // Object.entries(result.errors).forEach(([key, value]) => {
      //   form.setError(key as keyof RegisterFormData, {
      //     message: value as string,
      //   });
      // });
    }
  };
  return (
    <form onSubmit={onSubmit} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">OTP Authentication</h1>
          <p className="text-balance text-muted-foreground">
            Enter the 6 digit OTP sent to your email
          </p>
        </div>

        <div className="">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="grid w-full gap-0 grid-cols-6">
              <InputOTPSlot index={0} className="w-full py-5" />
              <InputOTPSlot index={1} className="w-full py-5" />
              <InputOTPSlot index={2} className="w-full py-5" />
              <InputOTPSlot index={3} className="w-full py-5" />
              <InputOTPSlot index={4} className="w-full py-5" />
              <InputOTPSlot index={5} className="w-full py-5" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <LoadingLutton type="submit" className="w-full">
          Verify account
        </LoadingLutton>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>

        <div className="text-center text-sm">
          Didn not receive an OTP.
          <Button
            variant={"link"}
            className="underline cursor-pointer underline-offset-4"
          >
            Resent
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VerifyOTPForm;
