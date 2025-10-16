import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};
const ProfileName = ({ className }: Props) => {
  return <p className={cn("", className)}>Md. Ebrahim</p>;
};

export default ProfileName;
