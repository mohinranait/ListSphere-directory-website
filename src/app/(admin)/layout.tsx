"use client";
import { cn } from "@/lib/utils";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getSingleUser } from "../actions/auth";
import { setUser } from "@/redux/features/authSlice";

interface Props {
  children?: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const user = await getSingleUser();
      console.log({ user });
      if (user?.success) {
        dispatch(setUser(user?.payload));
      }
    })();
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
        )}
      >
        {children}
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
