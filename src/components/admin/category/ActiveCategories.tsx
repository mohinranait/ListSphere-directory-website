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
import CategoryForm from "../category-form";
import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "sonner";
import { ICategory } from "@/types/category.type";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import LuIcon from "@/components/shared/LuIcon";
import { Input } from "@/components/ui/input";
import GlobalPagination from "@/components/shared/pagination";
type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
};
const ActiveCategories = ({ setIsOpenModal, isOpenModal }: Props) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [status, setStatus] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState<number>(0);
  const [allSelected, setAllSelected] = useState<string[]>([]);

  const getCategories = async (query: {
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
      const url = `/api/admin/categories?${params.toString()}`;
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
      setCategories(getData?.categories);
      setTotal(getData?.pagination?.total);
      setLimit(getData?.pagination?.limit);
      setPage(getData?.pagination?.page);
    } catch (error) {
      console.log({ error });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getCategories({
      page: 1,
      limit,
    });
  }, []);

  // handle search
  const handleSearch = () => {
    getCategories({
      page,
      limit,
      search,
      status: status === "all" ? "" : status,
    });
  };

  // handle filter by status
  const handleChangeStatus = (e: string) => {
    console.log({ e });
    setStatus(e);
    getCategories({
      page,
      limit,
      search,
      status: e === "all" ? "" : e,
    });
  };

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

  console.log({ page, limit, total });

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
        body: JSON.stringify({ ids: allSelected, action: true }),
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
          <Button variant={"default"}>
            Change {allSelected?.length} selected status
          </Button>
          <Button
            type="button"
            onClick={handelSoftDelete}
            variant={"destructive"}
          >
            Delete {allSelected?.length} selected
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center">
        <Select value={status} onValueChange={(e) => handleChangeStatus(e)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-background ">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex flex-1">
          <LucideIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="pl-9 bg-background "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="ml-2 shadow-sm"
          >
            Search
          </Button>
        </div>
      </div>

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
          {!isLoading &&
            categories.map((category, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    <Checkbox
                      id={category?._id}
                      checked={allSelected?.includes(category?._id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(category?._id)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium flex gap-1 items-center ">
                    {category.type === "icon" ? (
                      <LuIcon
                        iconName={`${category?.icon as LucideIconName}`}
                        size={14}
                      />
                    ) : (
                      ""
                    )}
                    {category.name}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={category.status ? "default" : "destructive"}
                    >
                      {category.status ? "Active" : "In-Active"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {format(new Date(category.createdAt), "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(category.updatedAt), "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpenModal(true);
                      }}
                      className="cursor-pointer size-8"
                    >
                      <Edit size={10} />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDeleteModal(true);
                      }}
                      type="button"
                      className="cursor-pointer size-8"
                      variant={"destructive"}
                    >
                      <Trash2 size={10} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <GlobalPagination
        totalItems={total}
        currentPage={page}
        itemsPerPage={limit}
        onPageChange={(page, limit) => {
          setPage(page);
          setLimit(limit);
          getCategories({
            page,
            limit,
            search,
            status: status === "all" ? "" : status,
          });
        }}
      />

      <CategoryForm
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setCategories={setCategories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
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

export default ActiveCategories;
