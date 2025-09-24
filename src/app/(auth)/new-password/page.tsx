"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { newPasswordSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

type TNewPassword = z.infer<typeof newPasswordSchema>;

const NewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<TNewPassword>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPasswoed: "",
      password: "",
    },
  });

  const onSubmit = async (data: TNewPassword) => {
    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data?.password, token }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success(result?.message);
      router.push(`/login`);
      form.reset();
    }
    setLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Setup new password</h1>
            <p className="text-balance text-muted-foreground">
              Configure new password
            </p>
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="newPasswoed"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="new-password">New Password</Label>

                  <div>
                    <div className="relative">
                      <Button
                        className="absolute bg-transparent hover:bg-transparent right-0 top-1/2 -translate-y-1/2 rounded-full  cursor-pointer text-gray-600 p-1"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeClosed /> : <Eye />}
                      </Button>

                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Confirm Password</Label>

                  <div>
                    <div className="relative">
                      <Button
                        className="absolute bg-transparent hover:bg-transparent right-0 top-1/2 -translate-y-1/2 rounded-full  cursor-pointer text-gray-600 p-1"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeClosed /> : <Eye />}
                      </Button>

                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <LoadingButton isLoading={loading} type="submit" className="w-full">
            Continue
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default NewPassword;
