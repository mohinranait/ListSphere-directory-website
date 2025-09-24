"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { forgotPasswordSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useState } from "react";
import LoadingButton from "../loading-button";
import { useRouter } from "next/navigation";

type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TForgotPassword) => {
    setLoading(true);

    const res = await fetch(`/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ email: data?.email }),
    });

    const resData = await res.json();
    if (resData?.success) {
      router.push("/verify-otp");
    }

    setLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              LUse your account email to request a password reset.
            </p>
          </div>
          <div className="grid gap-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        placeholder=""
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
          </div>

          <LoadingButton isLoading={loading} type="submit" className="w-full">
            Forgot Password
          </LoadingButton>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="text-center text-sm">
            Do you remember your password?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
