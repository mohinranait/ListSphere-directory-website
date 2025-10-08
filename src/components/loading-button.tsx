import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type LoadingLuttonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  type: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  callBack?: () => void;
};
const LoadingButton = ({
  children,
  className,
  isLoading,
  type = "button",
  icon,
  callBack,
  ...props
}: LoadingLuttonProps) => {
  return (
    <Button
      type={type}
      onClick={callBack}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : icon}
      {children}
    </Button>
  );
};

export default LoadingButton;
