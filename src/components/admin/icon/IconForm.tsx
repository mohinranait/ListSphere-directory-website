"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as LucideIcons from "lucide-react";
type LucideIconName = keyof typeof LucideIcons;
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import GlobalModal from "@/components/shared/GlobalModal";
import LoadingButton from "@/components/loading-button";
import UploadImage from "@/components/shared/UploadImage";
import { toast } from "sonner";
import { IIcon } from "@/types/icon.type";

// Fix schema
const iconSchema = z.object({
  name: z
    .string()
    .min(1, "Minimum 1 character required")
    .max(100, "Maximum 100 characters allowed")
    .trim()
    .nonempty("Name is required"),
  status: z.boolean().default(true).nonoptional(),
});

type IconFormValues = z.infer<typeof iconSchema>;

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIcons: React.Dispatch<React.SetStateAction<IIcon[]>>;
  selected: IIcon | null;
  setSelected: React.Dispatch<React.SetStateAction<IIcon | null>>;
};
const IconForm = ({
  isOpen,
  setIsOpenModal,
  setIcons,
  selected,
  setSelected,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IconFormValues>({
    resolver: zodResolver(iconSchema),
    defaultValues: {
      name: "",
      status: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Submit form
  const onSubmit = async (data: IconFormValues) => {
    setIsLoading(true);
    if (selected) {
      try {
        const res = await fetch(`/api/admin/icons/${selected?._id}`, {
          method: "PATCH",
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

        setIcons((prev) =>
          prev.map((item) =>
            item._id === selected?._id ? getRes?.payload.icon : item
          )
        );
        setIsOpenModal(false);
        setSelected(null);
        resetForm();
      } catch (error) {
        console.log({ error });
      }
    } else {
      try {
        const res = await fetch(`/api/admin/icons`, {
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

        setIcons((prev) => [getRes.payload.icon, ...prev]);
        setIsOpenModal(false);
        resetForm();
      } catch (error) {
        console.log({ error });
      }
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    reset({
      name: "",
      status: true,
    });
  };

  // Handle submit form using button
  const handlesubmitForm = () => {
    const d = getValues();
    onSubmit(d);
  };

  useEffect(() => {
    if (!selected) {
      return;
    }
    reset({
      name: selected?.name,
      status: selected?.status,
    });
  }, [selected]);

  return (
    <GlobalModal
      open={isOpen}
      setOpen={setIsOpenModal}
      className="!max-w-[400px]"
      withFooter={
        <LoadingButton
          isLoading={isLoading}
          callBack={handlesubmitForm}
          type="submit"
          className=""
        >
          {selected ? "Update" : "Save"}
        </LoadingButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
        {/* Name */}
        <div>
          <Label className="block text-sm font-medium mb-1">Icon Name</Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter icon name"
            className="w-full border p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Checkbox
                id="status"
                checked={field.value}
                onCheckedChange={(val) => field.onChange(val === true)}
              />
              <Label htmlFor="status">Active</Label>
            </div>
          )}
        />
      </form>
    </GlobalModal>
  );
};

export default IconForm;
