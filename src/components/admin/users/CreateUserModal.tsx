"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalModal from "@/components/shared/GlobalModal";
import LoadingButton from "@/components/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IUser } from "@/types/user.type";

const userSchema = z.object({
  fullName: z
    .string()
    .min(1, "Minimum 1 character required")
    .max(100, "Maximum 100 characters allowed")
    .trim(),
  email: z.string().min(5, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["admin", "user"]),
  isEmailVerified: z.boolean(),
  package: z.string().nonempty("Package is required"),
  password: z
    .string()
    .min(6, "Minimum 6 digit is required")
    .max(20, "Maximum 20 digit charecters"),
});

type UserProfile = z.infer<typeof userSchema>;

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};
const CreateUserModal = ({ isOpen, setIsOpenModal, setUsers }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
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

  const [isLoading, setIsLoading] = useState(false);

  // Submit form
  const onSubmit = async (data: UserProfile) => {
    console.log({ data });

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const getRes = await res.json();
      if (!getRes.success) {
        return;
      }
      toast.success(getRes.message);
      setUsers((prev) => [getRes.payload.user, ...prev]);
      setIsOpenModal(false);
      resetForm();
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    reset({
      fullName: "",
      email: "",
      phone: "",
      package: "free",
      role: "user",
      isEmailVerified: false,
    });
  };

  const handlesubmitForm = handleSubmit(onSubmit);

  return (
    <GlobalModal
      open={isOpen}
      setOpen={setIsOpenModal}
      className="!max-w-[400px]"
      withFooter={
        <LoadingButton
          isLoading={isLoading}
          callBack={handlesubmitForm}
          type="button"
          className=""
        >
          Save
        </LoadingButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div>
            <Input id="phone" type="text" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
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
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
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
          <Label htmlFor="password">Password</Label>
          <div>
            <Input id="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
      </form>
    </GlobalModal>
  );
};

export default CreateUserModal;
