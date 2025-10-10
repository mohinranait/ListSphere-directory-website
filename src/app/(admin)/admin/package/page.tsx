"use client";
import { Header } from "@/components/admin-header";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Edit,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PackageForm from "@/components/admin/package/PackageForm";
import { IPackage } from "@/types/package.type";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import DeleteModal from "@/components/shared/DeleteModal";

const PackageManage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [plans, setPlans] = useState<IPackage[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchPackage = async (query: { search?: string; status?: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.search) params.append("search", query.search);
      if (query.status) params.append("status", query.status);
      const url = `/api/admin/package?${params.toString()}`;

      const res = await fetch(url, {
        method: "GEt",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPlans(data?.payload?.plans);
      }
    } catch (error) {
      console.log({ error });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackage({});
  }, []);

  // delete package by ID
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/package/${selectedPlan?._id}`, {
        method: "DELETe",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPlans((prev) =>
          prev.filter((item) => item?._id !== selectedPlan?._id)
        );
        setSelectedPlan(null);
        setIsDeleteModal(false);
      }
    } catch (error) {
      console.log({ error });
    }
    setDeleteLoading(false);
  };

  // handle search
  const handleSearch = () => {
    fetchPackage({
      search,
      status: status === "all" ? "" : status,
    });
  };

  // handle filter by status
  const handleChangeStatus = (e: string) => {
    console.log({ e });
    setStatus(e);
    fetchPackage({
      search,
      status: e === "all" ? "" : e,
    });
  };

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <div className="ms-auto flex items-center space-x-4">
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main className="">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              Package
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your package structure
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="gap-2 shadow-sm"
            size="default"
          >
            <Plus className="h-4 w-4" />
            New package
          </Button>
        </div>

        <div className="mt-3">
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
        </div>

        {!loading && plans?.length === 0 && (
          <div className="text-center py-10 bg-gray-100 rounded-md">
            Data not found
          </div>
        )}
        <div className="grid grid-cols-3 gap-4  ">
          {loading &&
            Array.from({ length: 3 }).map((_, item) => {
              return (
                <div className="border rounded-md  p-4 space-y-3">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8 rounded-md" />
                </div>
              );
            })}
          {!loading &&
            plans?.map((plan, idx) => (
              <div
                key={idx}
                className="w-full relative  p-5  bg-white border rounded-md  "
              >
                {plan.suggestion && (
                  <Badge className="absolute bg-primary left-1/2 -translate-x-1/2 rounded-md text-white -top-2">
                    Suggestion
                  </Badge>
                )}
                <div className="mb-3 pb-3 flex items-center border-b border-gray-300">
                  <div className="">
                    <span className="block text-2xl font-semibold">
                      {plan.name}
                    </span>
                    <span>
                      <span className="font-medium text-gray-500 text-xl align-top">
                        $&thinsp;
                      </span>
                      <span className="text-3xl font-bold">{plan?.price} </span>
                    </span>
                    <span className="text-gray-500 font-medium">/ year</span>
                  </div>
                </div>
                <ul className="mb-7 font-medium text-gray-500">
                  {plan?.options?.map((option, index) => (
                    <li key={index} className="flex items-center  mb-2">
                      {option?.access ? (
                        <Check
                          className={cn(
                            "size-4 text-black",
                            !option?.access && "text-gray-500"
                          )}
                        />
                      ) : (
                        <X className="size-4" />
                      )}
                      <span
                        className={cn(
                          "ml-2 text-black",
                          !option?.access && "text-gray-500"
                        )}
                      >
                        {option?.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "flex justify-center items-center  rounded-md py-1 px-4 text-center w-full",
                    !plan.status &&
                      "bg-red-500 hover:bg-red-400 cursor-not-allowed"
                  )}
                >
                  {plan.status ? "Choose Plan" : "In-Active"}

                  <ArrowRight />
                </Button>
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsOpenModal(true);
                    }}
                    variant={"outline"}
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsDeleteModal(true);
                    }}
                    type="button"
                    variant={"secondary"}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </Main>

      <PackageForm
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setPlans={setPlans}
        selected={selectedPlan}
        setSelected={setSelectedPlan}
      />

      <DeleteModal
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        callBack={handleDelete}
        isLoading={deleteLoading}
      />
    </>
  );
};

export default PackageManage;
