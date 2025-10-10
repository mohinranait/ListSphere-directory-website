"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GlobalModal from "@/components/shared/GlobalModal";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import type { IPackage } from "@/types/package.type";
import { Plus, Trash2 } from "lucide-react";

const planSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Name can only contain letters, numbers, spaces, hyphens, and underscores"
    )
    .nonempty("Package name is required"),
  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(999999, "Price cannot exceed 999,999")
    .finite("Price must be a valid number"),

  postLimit: z
    .number()
    .min(1, "Post limit must be at least 1")
    .default(1)
    .nonoptional(),
  status: z.boolean().default(true).nonoptional(),
  suggestion: z.boolean().default(false).nonoptional(),
  isDelete: z.boolean().default(false).nonoptional(),
  priority: z.number(),
  options: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Option name must be at least 2 characters")
          .max(50, "Option name cannot exceed 50 characters")
          .trim()
          .nonempty("Option name is required"),
        access: z.boolean().default(false).nonoptional(),
      })
    )
    .optional(),
});

type PlanFormValues = z.infer<typeof planSchema>;

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setPlans: React.Dispatch<React.SetStateAction<IPackage[]>>;
  selected: IPackage | null;
  setSelected: React.Dispatch<React.SetStateAction<IPackage | null>>;
};

const PackageForm = ({
  isOpen,
  setIsOpenModal,
  setPlans,
  selected,
  setSelected,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      priority: 1,
      postLimit: 1,
      status: true,
      isDelete: false,
      suggestion: false,
      price: 0,
      options: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      reset({
        name: selected.name,
        priority: selected.priority,
        price: selected.price ?? 0,
        postLimit: selected.postLimit ?? 1,
        status: selected.status ?? true,
        suggestion: selected.suggestion ?? false,
        isDelete: selected.isDelete ?? false,
        options: selected.options ?? [],
      });
    } else {
      reset({
        name: "",
        price: 0,
        priority: 1,
        postLimit: 1,
        status: true,
        suggestion: false,
        isDelete: false,
        options: [],
      });
    }
  }, [selected, reset]);

  // Submit form
  const onSubmit = async (data: PlanFormValues) => {
    setIsLoading(true);
    try {
      if (selected) {
        // Update existing package
        const res = await fetch(`/api/admin/package/${selected._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        const getRes = await res.json();
        if (getRes.success) {
          toast.success(getRes.message);
          setPlans((prev) =>
            prev.map((item) =>
              item._id === selected._id ? getRes?.payload.plan : item
            )
          );
          setIsOpenModal(false);
          setSelected(null);
          reset();
        } else {
          toast.error(getRes.message || "Failed to update package");
        }
      } else {
        // Create new package
        const res = await fetch(`/api/admin/package`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        const getRes = await res.json();
        if (getRes.success) {
          toast.success(getRes.message);
          setPlans((prev) => [getRes.payload.plan, ...prev]);
          setIsOpenModal(false);
          reset();
        } else {
          toast.error(getRes.message || "Failed to create package");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the package");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalModal
      open={isOpen}
      setOpen={setIsOpenModal}
      className="!max-w-[600px]"
      withFooter={
        <LoadingButton
          isLoading={isLoading}
          callBack={handleSubmit(onSubmit)}
          type="button"
          className=""
        >
          {selected ? "Update Package" : "Create Package"}
        </LoadingButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Basic Information
          </h3>

          {/* Name */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Package Name <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name")}
              placeholder="e.g., Premium Plan, Starter Package"
              className="w-full"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1.5">
                {errors.name.message}
              </p>
            )}
            <p className="text-muted-foreground text-xs mt-1">
              Enter a unique name for this package (3-100 characters)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 ">
            {/* Price */}
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium mb-1.5"
              >
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                id="price"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                className="w-full"
              />
              {errors.price && (
                <p className="text-destructive text-sm mt-1.5">
                  {errors.price.message}
                </p>
              )}
              <p className="text-muted-foreground text-xs mt-1">
                Set the package price (0 for free packages)
              </p>
            </div>

            {/* Post Limit */}
            <div>
              <Label
                htmlFor="postLimit"
                className="block text-sm font-medium mb-1.5"
              >
                Post Limit <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                id="postLimit"
                {...register("postLimit", { valueAsNumber: true })}
                placeholder="e.g., 10, 50, 100"
                className="w-full"
              />
              {errors.postLimit && (
                <p className="text-destructive text-sm mt-1.5">
                  {errors.postLimit.message}
                </p>
              )}
              <p className="text-muted-foreground text-xs mt-1">
                Maximum number of posts allowed (1-10,000)
              </p>
            </div>
          </div>
          <div>
            <Label
              htmlFor="priority"
              className="block text-sm font-medium mb-1.5"
            >
              Priority <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              id="priority"
              step="1"
              {...register("priority", { valueAsNumber: true })}
              className="w-full"
            />
            {errors.priority && (
              <p className="text-destructive text-sm mt-1.5">
                {errors.priority.message}
              </p>
            )}
            <p className="text-muted-foreground text-xs mt-1">
              Set the package serial for client side
            </p>
          </div>
        </div>

        {/* Package Options Section */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Package Options
              </h3>
              <p className="text-muted-foreground text-sm">
                Add features and permissions for this package
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", access: false })}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Option
            </Button>
          </div>

          {fields.length > 0 && (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                >
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label
                        htmlFor={`options.${index}.name`}
                        className="text-sm font-medium mb-1.5 block"
                      >
                        Option Name
                      </Label>
                      <Input
                        {...register(`options.${index}.name`)}
                        placeholder="e.g., Advanced Analytics, Priority Support"
                        className="w-full"
                      />
                      {errors.options?.[index]?.name && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.options[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <Controller
                      name={`options.${index}.access`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`options.${index}.access`}
                            checked={field.value}
                            onCheckedChange={(val) =>
                              field.onChange(val === true)
                            }
                          />
                          <Label
                            htmlFor={`options.${index}.access`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Grant access to this feature
                          </Label>
                        </div>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {fields.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground text-sm">
                No options added yet. Click "Add Option" to include features.
              </p>
            </div>
          )}
        </div>

        {/* Package Settings Section */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-foreground">
            Package Settings
          </h3>

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="status"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(val === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="status"
                    className="font-medium cursor-pointer"
                  >
                    Active Status
                  </Label>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Enable this package for users to purchase and use
                  </p>
                </div>
              </div>
            )}
          />

          {/* Suggestion */}
          <Controller
            name="suggestion"
            control={control}
            render={({ field }) => (
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="suggestion"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(val === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="suggestion"
                    className="font-medium cursor-pointer"
                  >
                    Suggested Package
                  </Label>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Mark as recommended or featured package for users
                  </p>
                </div>
              </div>
            )}
          />

          {/* isDelete */}
          <Controller
            name="isDelete"
            control={control}
            render={({ field }) => (
              <div className="flex items-start gap-3 p-3 border rounded-lg border-destructive/50 bg-destructive/5">
                <Checkbox
                  id="isDelete"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(val === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="isDelete"
                    className="font-medium cursor-pointer text-destructive"
                  >
                    Mark for Deletion
                  </Label>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Flag this package for removal (soft delete)
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      </form>
    </GlobalModal>
  );
};

export default PackageForm;
