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
import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import LuIcon from "@/components/shared/LuIcon";
import * as LucideIcons from "lucide-react";
import { IIcon } from "@/types/icon.type";
import IconForm from "./IconForm";
type LucideIconName = keyof typeof LucideIcons;

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
};
const TrashIcon = ({ setIsOpenModal, isOpenModal }: Props) => {
  const [icons, setIcons] = useState<IIcon[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null);
  const [allSelected, setAllSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getIcons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/icons/trash`, {
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
      setIcons(getRes.payload?.icons);
    } catch (error) {
      console.log({ error });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getIcons();
  }, []);

  // delete method
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/icons/${selectedIcon?._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const resData = await res.json();
      if (!resData.success) {
        return;
      }
      const icon = resData.payload?.icon;

      setIcons((prev) => prev.filter((item) => item?._id !== icon?._id));
      setIsDeleteModal(false);
      setSelectedIcon(null);
      toast.success(resData.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle single select
  const handleCheckboxChange = (item: string) => {
    if (allSelected.includes(item)) {
      setAllSelected((prev) => prev.filter((p) => p !== item));
    } else {
      setAllSelected((prev) => [...prev, item]);
    }
  };

  // handle all Select
  const handleAllSelect = () => {
    if (allSelected?.length === icons.length) {
      setAllSelected([]);
    } else {
      setAllSelected(icons?.map((p) => p._id));
    }
  };

  const handelSoftDelete = async () => {
    try {
      const res = await fetch(`/api/admin/icons`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ids: allSelected, action: false }),
      });
      const resData = await res.json();
      if (resData?.success) {
        setIcons((prev) =>
          prev.filter((icon) => !allSelected.includes(icon._id))
        );
        setAllSelected([]);
      }
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
      <div className="pt-4">
        {icons?.length === 0 && !isLoading && (
          <div className="bg-gray-100 py-10 text-center">Data not found</div>
        )}
        <div className="grid grid-cols-6 gap-2">
          {isLoading &&
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div key={colIndex}>
                <Skeleton className="h-20 " />{" "}
              </div>
            ))}
          {!isLoading &&
            icons.map((icon, idx) => {
              return (
                <div key={idx} className="border p-2  rounded-md">
                  <div className="font-medium flex flex-col text-xs gap-1 items-center ">
                    <LuIcon
                      iconName={`${icon?.name as LucideIconName}`}
                      size={16}
                    />

                    {icon.name}
                  </div>

                  <div className="text-right flex justify-between gap-2">
                    <div className="flex gap-2 ">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIcon(icon);
                          setIsOpenModal(true);
                        }}
                        className="cursor-pointer size-5"
                      >
                        <Edit size={6} className="size-3" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedIcon(icon);
                          setIsDeleteModal(true);
                        }}
                        type="button"
                        className="cursor-pointer text-red-500 size-5"
                      >
                        <Trash2 size={6} className="size-3" />
                      </button>
                    </div>
                    <Checkbox
                      id={icon?._id}
                      checked={allSelected?.includes(icon?._id)}
                      onCheckedChange={() => handleCheckboxChange(icon?._id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <IconForm
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setIcons={setIcons}
        selected={selectedIcon}
        setSelected={setSelectedIcon}
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

export default TrashIcon;
