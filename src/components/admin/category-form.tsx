"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "../ui/label";
import GlobalModal from "../shared/GlobalModal";
import LoadingButton from "../loading-button";
import UploadImage from "../shared/UploadImage";
import { toast } from "sonner";
import { ICategory } from "@/types/category.type";

// Fix schema
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Minimum 1 character required")
    .max(100, "Maximum 100 characters allowed")
    .trim()
    .nonempty("Name is required"),
  type: z.enum(["image", "icon"]).default("image").nonoptional(),
  status: z.boolean().default(true).nonoptional(),
  icon: z.string(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};
const CategoryForm = ({ isOpen, setIsOpenModal, setCategories }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "image",
      status: true,
      icon: "",
    },
  });

  // Submit form
  const onSubmit = async (data: CategoryFormValues) => {
    console.log("Form Data:", data);
    try {
      const res = await fetch(`/api/admin/categories`, {
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
      console.log(getRes);

      setCategories((prev) => [getRes.payload.category, ...prev]);
      setIsOpenModal(false);
      resetForm();
      console.log({ getRes });
    } catch (error) {
      console.log({ error });
    }
  };

  const resetForm = () => {
    reset({
      name: "",
      icon: "",
      status: true,
      type: "image",
    });
  };

  // Handle submit form using button
  const handlesubmitForm = () => {
    const d = getValues();
    onSubmit(d);
  };

  // handle tabe with type
  const handleTabValue = (e: "image" | "icon") => {
    setValue("type", e);
  };

  return (
    <GlobalModal
      open={isOpen}
      setOpen={setIsOpenModal}
      className="!max-w-[500px]"
      withFooter={
        <LoadingButton callBack={handlesubmitForm} type="submit" className="">
          Save
        </LoadingButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
        {/* Name */}
        <div>
          <Label className="block text-sm font-medium mb-1">Name</Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter category name"
            className="w-full border p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <Tabs
          onValueChange={(e) => handleTabValue(e as "image" | "icon")}
          defaultValue="image"
          className="gap-1"
        >
          <TabsList>
            <TabsTrigger value="image" className="cursor-pointer">
              Image
            </TabsTrigger>
            <TabsTrigger value="icon" className="cursor-pointer">
              Icon
            </TabsTrigger>
          </TabsList>
          <TabsContent value="image">
            <div>
              {/* <Label className="block text-sm font-medium mb-1">Image</Label> */}
              <UploadImage className="bg-white" />
            </div>
          </TabsContent>
          <TabsContent value="icon">
            <div>
              {/* <Label className="block text-sm font-medium mb-1">Icon</Label> */}
              <Input
                type="text"
                {...register("icon")}
                placeholder="Enter icon name (e.g. home, user, etc.)"
                className=""
              />
              {errors.icon && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.icon.message}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

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

export default CategoryForm;
