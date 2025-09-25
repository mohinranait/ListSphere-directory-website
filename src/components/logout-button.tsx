"use client";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  className?: string;
};
const LogoutButton = ({ children, className }: Props) => {
  const router = useRouter();
  const handleLogout = async () => {
    console.log("Clicked");

    const res = await fetch(`/api/auth/logout`, {
      method: "GET",
    });
    const data = await res.json();
    console.log({ data });
    if (data.success) {
      router.push("/");
    }
  };
  return (
    <button
      onClick={() => handleLogout()}
      type="button"
      className={cn("p-0 bg-transparent", className)}
    >
      {children ? children : "Logout"}
    </button>
  );
};

export default LogoutButton;
