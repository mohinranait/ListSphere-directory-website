"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const VerifyEmailButton = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp");

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, token }),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        router.push(`/login`);
      } else {
        toast.error(result.message);
        setErrors(true);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      setErrors(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (loading) {
    return (
      <div className="py-10 space-y-5 px-3">
        <Skeleton className="w-24 h-24 mx-auto rounded-full" />
        <Skeleton className="h-8 w-48 mx-auto rounded-md" />
        <Skeleton className="h-4 w-80 mx-auto rounded-md" />
        <Skeleton className="h-10 w-40 mx-auto rounded-md" />
      </div>
    );
  }

  if (errors && !loading) {
    return (
      <div className="py-10 space-y-5 px-3">
        <div>
          <Image
            src={"/unsuccessfull.webp"}
            width={100}
            height={100}
            alt="Verify image"
            className="w-25 mx-auto"
          />
        </div>
        <p className="text-2xl sm:text-3xl font-semibold text-center text-gray-700">
          Verification failed
        </p>
        <p className="text-gray-500 text-center">
          Something went wrong while verifying your email. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-5 px-3">
      <div>
        <Image
          src={"/success-verify.png"}
          width={100}
          height={100}
          alt="Verify image"
          className="w-25 mx-auto"
        />
      </div>
      <p className="text-2xl sm:text-3xl font-semibold text-center text-gray-700">
        Email verification
      </p>
      <p className="text-gray-500 text-center">
        Your email has been successfully verified. You can now log in using your
        email and password.
      </p>
      <div className="text-center">
        <Link href={"/login"}>
          <Button className="cursor-pointer" type="button">
            Continue login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailButton;
