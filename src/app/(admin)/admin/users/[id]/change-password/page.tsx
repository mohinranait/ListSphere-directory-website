"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

const changePassSchema = z.object({
  password: z
    .string()
    .min(6, "Minimum 6 character required")
    .max(100, "Maximum 100 characters allowed"),
});

type ChangePasswordSchema = z.infer<typeof changePassSchema>;

const ChangePassword = () => {
  const params = useParams();
  const userId = params.id;
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    const { password } = data || {};

    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/change-password`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
        credentials: "include",
      });
      const resData = await res.json();
      if (resData.success) {
        toast.success(resData?.message);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <p className="text-lg font-semibold">Set new password</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeClosed className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <LoadingButton isLoading={updateLoading} type="submit">
          Change Password
        </LoadingButton>
      </div>
    </form>
  );
};

export default ChangePassword;
