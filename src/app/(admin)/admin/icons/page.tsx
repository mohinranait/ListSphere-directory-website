"use client";
import { Header } from "@/components/admin-header";
import ActiveIcon from "@/components/admin/icon/ActiveIcon";
import TrashIcon from "@/components/admin/icon/TrashIcon";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const IconPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

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
              Icons
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your icon structure
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="gap-2 shadow-sm"
            size="default"
          >
            <Plus className="h-4 w-4" />
            New Icon
          </Button>
        </div>

        <Tabs defaultValue="active" className="gap-1 pt-2">
          <TabsList>
            <TabsTrigger value="active" className="cursor-pointer">
              Active
            </TabsTrigger>
            <TabsTrigger value="trash" className="cursor-pointer">
              Trash
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ActiveIcon
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </TabsContent>
          <TabsContent value="trash">
            <TrashIcon
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
};

export default IconPage;
