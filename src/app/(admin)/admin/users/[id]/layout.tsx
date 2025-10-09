"use client";
import { Header } from "@/components/admin-header";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";

import { ArrowLeft, Key, User } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const UserProfileLayout = ({ children }: Props) => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  //   console.log({ id });

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
          <div>
            <div className="space-y-1">
              <h1 className="text-3xl flex gap-2 font-semibold tracking-tight text-balance">
                <button
                  onClick={() => {
                    router.push(`/admin/users`);
                  }}
                  type="button"
                  className="cursor-pointer"
                >
                  <ArrowLeft />
                </button>{" "}
                Profile Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-3 gap-5">
          <ul className="border rounded-md p-3">
            <li>
              <Link
                href={`/admin/users/${id}`}
                className="flex items-center hover:bg-gray-100 rounded-md py-1 px-2 gap-2"
              >
                <User size={15} />
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/admin/users/${id}/change-password`}
                className="flex items-center hover:bg-gray-100 rounded-md py-1 px-2 gap-2"
              >
                <Key size={15} />
                Change Password
              </Link>
            </li>
          </ul>
          <div className="col-span-2 border rounded-md p-5">{children}</div>
        </div>
      </Main>
    </>
  );
};

export default UserProfileLayout;
