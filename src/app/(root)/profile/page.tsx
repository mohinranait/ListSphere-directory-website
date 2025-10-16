import LoadingButton from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileImage from "@/components/ui/ProfileImage";
import { Pen } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const profileSchema = z.object({});

const ProfilePage = () => {
  // const {} = useForm({
  //   resolver:
  //   defaultValues: {},
  // })
  return (
    <div className="space-y-5 gap-4 grid grid-cols-[250px_auto]">
      <div className="bg-white border rounded-md space-y-5 p-5">
        <div className="flex flex-col items-center justify-center ">
          <div className=" relative">
            <Label
              htmlFor="file"
              className="absolute bottom-1 bg-accent-foreground text-white ring-2 ring-primary cursor-pointer flex items-center justify-center right-1 size-6 rounded-full"
            >
              <Pen className="size-3" />
              <input type="file" hidden id="file" />
            </Label>
            <ProfileImage className="mx-auto" />
          </div>
          <div className="mt-4">
            <p className="font-semibold text-center">Mohin Rana</p>
            <p className="font-medium text-center text-sm text-gray-500">
              kiro@gmail.com
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Personal</p>
          <ul>
            <li className="flex text-gray-600 justify-between items-center">
              <span>Phone</span>
              <span>+8801728068200</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">General</p>
          <ul>
            <li className="flex text-gray-600 justify-between items-center">
              <span>Role</span>
              <Badge variant={"outline"}>User</Badge>
            </li>
            <li className="flex text-gray-600 justify-between items-center">
              <span>Plan</span>
              <Badge variant={"default"}>Gold</Badge>
            </li>
            <li className="flex text-gray-600 justify-between items-center">
              <span>Email</span>
              <Badge variant={"secondary"}>Verified</Badge>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white border rounded-md space-y-8  p-5">
        <form action="">
          <p className="text-lg font-semibold mb-3 ">Profile </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input placeholder="Full name" type="text" name="fullName" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Phone" type="number" name="phone" />
            </div>
            <div>
              <LoadingButton type="button">Update</LoadingButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
