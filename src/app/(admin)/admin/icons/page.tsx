"use client";
import { Header } from "@/components/admin-header";
import ActiveIcon from "@/components/admin/icon/ActiveIcon";
import TrashIcon from "@/components/admin/icon/TrashIcon";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Manage icons</h1>
          <div className="flex items-center space-x-2">
            <Button type="button" onClick={() => setIsOpenModal(true)}>
              New Icon
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="gap-1">
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
