"use client";
import { Header } from "@/components/admin-header";
import Main from "@/components/admin/main";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ActiveCategories from "@/components/admin/category/ActiveCategories";
import TrashCategories from "@/components/admin/category/TrashCategories";

const CategoryManage = () => {
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
          <h1 className="text-2xl font-bold tracking-tight">
            Manage categories
          </h1>
          <div className="flex items-center space-x-2">
            <Button type="button" onClick={() => setIsOpenModal(true)}>
              New Category
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
            <ActiveCategories
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </TabsContent>
          <TabsContent value="trash">
            <TrashCategories
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
};

export default CategoryManage;
