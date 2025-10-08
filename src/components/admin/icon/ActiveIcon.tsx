"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import * as LucideIcons from "lucide-react";
type LucideIconName = keyof typeof LucideIcons;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import LuIcon from "@/components/shared/LuIcon";
import { Input } from "@/components/ui/input";
import GlobalPagination from "@/components/shared/pagination";
import { IIcon } from "@/types/icon.type";
import IconForm from "./IconForm";
type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
};
const ActiveIcon = ({ setIsOpenModal, isOpenModal }: Props) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [icons, setIcons] = useState<IIcon[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState<number>(0);
  const [allSelected, setAllSelected] = useState<string[]>([]);

  const getIcons = async (query: {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
  }) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.limit) params.append("limit", String(query.limit));
      if (query.page) params.append("page", String(query.page));
      if (query.search) params.append("search", query.search);
      if (query.status) params.append("status", query.status);
      const url = `/api/admin/icons?${params.toString()}`;
      const res = await fetch(url, {
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

      const getData = getRes.payload;
      setIcons(getData?.icons);
      setTotal(getData?.pagination?.total);
      setLimit(getData?.pagination?.limit);
      setPage(getData?.pagination?.page);
    } catch (error) {
      console.log({ error });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getIcons({
      page: 1,
      limit,
    });
  }, []);

  // handle search
  const handleSearch = () => {
    getIcons({
      page,
      limit,
      search,
      status: status === "all" ? "" : status,
    });
  };

  // handle filter by status
  const handleChangeStatus = (e: string) => {
    setStatus(e);
    getIcons({
      page,
      limit,
      search,
      status: e === "all" ? "" : e,
    });
  };

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
      const cat = resData.payload?.icon;

      setIcons((prev) => prev.filter((item) => item?._id !== cat?._id));
      setIsDeleteModal(false);
      setSelectedIcon(null);
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

  console.log({ page, limit, total });

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
        body: JSON.stringify({ ids: allSelected, action: true }),
      });
      const resData = await res.json();
      if (resData?.success) {
        setIcons((prev) =>
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
          <Button variant={"default"}>
            Change {allSelected?.length} selected status
          </Button>
          <Button
            type="button"
            onClick={handelSoftDelete}
            variant={"destructive"}
          >
            Trash {allSelected?.length} selected
          </Button>
        </div>
      )}

      <div className="flex gap-3">
        <Select value={status} onValueChange={(e) => handleChangeStatus(e)}>
          <SelectTrigger className="min-w-[150px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">In-Active</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="rounded-r-none"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="rounded-l-none"
          >
            Search
          </Button>
        </div>
      </div>

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

      <GlobalPagination
        totalItems={total}
        currentPage={page}
        itemsPerPage={limit}
        onPageChange={(page, limit) => {
          setPage(page);
          setLimit(limit);
          getIcons({
            page,
            limit,
            search,
            status: status === "all" ? "" : status,
          });
        }}
      />

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

export default ActiveIcon;
