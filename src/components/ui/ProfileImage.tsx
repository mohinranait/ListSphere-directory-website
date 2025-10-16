import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
};
const ProfileImage = ({ className }: Props) => {
  return (
    <Image
      src={"/diverse-woman-avatar.png"}
      width={100}
      height={100}
      alt="User"
      className={cn(
        "w-[100px] h-[100px] ring-2 ring-offset-1 ring-primary rounded-full",
        className
      )}
    />
  );
};

export default ProfileImage;
