"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CategoryForm from "../category-form";
import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "sonner";
import { ICategory } from "@/types/category.type";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
};
const TrashCategories = ({ setIsOpenModal, isOpenModal }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [allSelected, setAllSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/trash`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const getRes = await res.json();
      if (!getRes.success) {
        return;
      }
      console.log({ getRes });
      setCategories(getRes.payload?.categories);
    } catch (error) {
      console.log({ error });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // delete method
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/admin/categories/${selectedCategory?._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const resData = await res.json();
      if (!resData.success) {
        return;
      }
      const cat = resData.payload?.category;

      setCategories((prev) => prev.filter((item) => item?._id !== cat?._id));
      setIsDeleteModal(false);
      setSelectedCategory(null);
      toast.success(resData.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle single select
  const handleCheckboxChange = (cat: string) => {
    if (allSelected.includes(cat)) {
      setAllSelected((prev) => prev.filter((p) => p !== cat));
    } else {
      setAllSelected((prev) => [...prev, cat]);
    }
  };

  // handle all Select
  const handleAllSelect = () => {
    if (allSelected?.length === categories.length) {
      setAllSelected([]);
    } else {
      setAllSelected(categories?.map((p) => p._id));
    }
  };

  const handelSoftDelete = async () => {
    try {
      const res = await fetch(`/api/admin/categories`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ids: allSelected, action: false }),
      });
      const resData = await res.json();
      if (resData?.success) {
        setCategories((prev) =>
          prev.filter((cat) => !allSelected.includes(cat._id))
        );
        setAllSelected([]);
      }
      console.log({ resData });
    } catch (error) {}
  };

  return (
    <div>
      {allSelected?.length > 0 && (
        <div className="rounded-md border flex gap-3 p-3">
          <Button onClick={() => setAllSelected([])} variant={"outline"}>
            Cancel {allSelected?.length} selected
          </Button>

          <Button type="button" onClick={handelSoftDelete} variant={"default"}>
            Restore {allSelected?.length} selected
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">
              <Checkbox
                id="all-status"
                checked={allSelected.length === categories.length}
                onCheckedChange={handleAllSelect}
              />
            </TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>icon</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 4 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-6 " />{" "}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {categories?.length === 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={7} className="bg-gray-100 text-center">
                Data not found
              </TableCell>
            </TableRow>
          )}
          {categories.map((category, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                <Checkbox
                  id={category?._id}
                  checked={allSelected?.includes(category?._id)}
                  onCheckedChange={() => handleCheckboxChange(category?._id)}
                />
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.type}</TableCell>
              <TableCell>
                <Badge variant={category.status ? "default" : "destructive"}>
                  {category.status ? "Active" : "In-Active"}
                </Badge>
              </TableCell>

              <TableCell>
                {format(new Date(category.createdAt), " dd MMM, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(category.updatedAt), " dd MMM, yyyy")}
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Button className="cursor-pointer">
                  <Edit />
                </Button>
                <Button
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDeleteModal(true);
                  }}
                  type="button"
                  className="cursor-pointer"
                  variant={"destructive"}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CategoryForm
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setCategories={setCategories}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        callBack={handleDelete}
      />
    </div>
  );
};

export default TrashCategories;
