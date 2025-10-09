"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const userSchema = z.object({
  fullName: z
    .string()
    .min(1, "Minimum 1 character required")
    .max(100, "Maximum 100 characters allowed")
    .trim(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["admin", "user"]),
  isEmailVerified: z.boolean(),
  package: z.string().nonempty("Package is required"),
});

type UserProfile = z.infer<typeof userSchema>;

const SkeletonInput = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
);

const SkeletonButton = () => <Skeleton className="h-10 w-24 rounded-md" />;

const SingleUser = () => {
  const params = useParams();
  const userId = params.id;
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "user",
      isEmailVerified: false,
      package: "free",
    },
  });

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      const user = data.payload.user;

      if (data.success) {
        reset({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          package: user.package || "free",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data: UserProfile) => {
    const {
      fullName,
      phone,
      role,
      package: memberPackage,
      isEmailVerified,
    } = data || {};

    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          role,
          isEmailVerified,
          package: memberPackage,
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

  if (isLoading) {
    return (
      <div className="space-y-5">
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <div className="grid grid-cols-2 gap-3">
          <SkeletonInput />
          <SkeletonInput />
        </div>
        <SkeletonInput />
        <SkeletonButton />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <p className="text-lg font-semibold">Profile</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" readOnly {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="text" {...register("phone")} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>

        {/* Email Verified */}
        <div className="space-y-2">
          <Label htmlFor="isEmailVerified">Email Verified</Label>
          <Controller
            control={control}
            name="isEmailVerified"
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Verify email" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Verify</SelectItem>
                  <SelectItem value="false">Not Verified</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.isEmailVerified && (
            <p className="text-red-500">{errors.isEmailVerified.message}</p>
          )}
        </div>
      </div>

      {/* Membership Package */}
      <div className="space-y-2">
        <Label htmlFor="package">Membership</Label>
        <Controller
          control={control}
          name="package"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select membership plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.package && (
          <p className="text-red-500">{errors.package.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <LoadingButton isLoading={updateLoading} type="submit">
          Update
        </LoadingButton>
      </div>
    </form>
  );
};

export default SingleUser;
