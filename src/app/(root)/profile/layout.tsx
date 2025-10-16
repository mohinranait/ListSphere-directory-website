import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import ProfileImage from "@/components/ui/ProfileImage";
import ProfileName from "@/components/ui/ProfileName";
import { proifleMenus } from "@/consts/menus";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const ProfileLayout = ({ children }: Props) => {
  return (
    <div className="bg-muted/30">
      <div className="bg-gray-400/50">
        <Container className="pb-13 pt-5">
          <div className="flex gap-3.5">
            <ProfileImage className="w-10 h-10" />
            <div>
              <ProfileName className="font-semibold" />
              <div className="">
                Plan: <Badge>Gold</Badge>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className=" -mt-10 pb-10 ">
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white border rounded-md p-4 space-y-4">
            <ul className="">
              <p className="text-xl font-semibold mb-2">Profile Action</p>
              {proifleMenus?.profils?.map((item, idx) => {
                const Icon = item?.icon;
                return (
                  <li key={idx}>
                    <Link
                      className="py-2 px-3 items-center gap-2 rounded-md hover:bg-primary/90 hover:text-white text-gray-700 flex "
                      href={item?.url}
                    >
                      <Icon size={16} />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="">
              <p className="text-xl font-semibold mb-2">Listing Action</p>
              {proifleMenus?.listers?.map((item, idx) => {
                const Icon = item?.icon;
                return (
                  <li key={idx}>
                    <Link
                      className="py-2 px-3 items-center gap-2 rounded-md hover:bg-primary/90 hover:text-white text-gray-700 flex "
                      href={item?.url}
                    >
                      <Icon size={16} />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-3">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileLayout;
