"use client";
import { Header } from "@/components/admin-header";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import GlobalTable, { Column } from "@/components/shared/GlobalTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser } from "@/types/user.type";
import { Edit, Eye, Plus, Search, Trash, Trash2, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import CreateUserModal from "@/components/admin/users/CreateUserModal";

const AllUsersManage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin/users`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      // console.log({ data });
      if (data.success) {
        setUsers(data?.payload?.users);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log({ users });

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: () => <Checkbox id="terms" className="rounded-[3px]" />,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName: string) => <p className="">{fullName}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <p className="">{email}</p>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => <p className="">{phone ? phone : "N/A"}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Badge
          variant={role === "admin" ? "default" : "secondary"}
          className=""
        >
          {role === "admin" ? "Admin" : "User"}
        </Badge>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return (
          <>
            <p className="text-nowrap text-text-gray">
              {format(new Date(createdAt), "dd MMM, yyyy")}
            </p>
            <p className="text-xs text-gray-600">
              {format(new Date(createdAt), "hh:mm a")}
            </p>
          </>
        );
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => {
        return (
          <>
            <p className="text-nowrap ">
              {format(new Date(updatedAt), "dd MMM, yyyy")}
            </p>
            <p className="text-xs text-gray-600">
              {format(new Date(updatedAt), "hh:mm a")}
            </p>
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: IUser) => {
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/users/${record?._id}`}>
              <Button variant={"outline"} className="rounded-md size-8 ">
                <Eye size={12} className="size-4" />
              </Button>
            </Link>

            <Button className="rounded-md size-8 ">
              <Edit size={12} className="size-4" />
            </Button>
            <Button variant={"destructive"} className="rounded-md size-8 ">
              <Trash2 size={12} className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];

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
              Users
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your user structure
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="gap-2 shadow-sm"
            size="default"
          >
            <Plus className="h-4 w-4" />
            New User
          </Button>
        </div>

        <div className="flex flex-col pt-3 gap-3 pb-3 sm:flex-row sm:items-center">
          <Select
          // value={status}
          // onValueChange={(e) => handleChangeStatus(e)}
          >
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
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 bg-background "
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleSearch();
              //   }
              // }}
            />
            <Button
              type="button"
              // onClick={handleSearch}
              className="ml-2 shadow-sm"
            >
              Search
            </Button>
          </div>
        </div>

        <div>
          <GlobalTable dataSource={users} columns={columns} />
        </div>
      </Main>
      <CreateUserModal
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setUsers={setUsers}
      />
    </>
  );
};

export default AllUsersManage;
