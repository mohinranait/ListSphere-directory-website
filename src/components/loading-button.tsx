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
};
const LoadingLutton = ({
  children,
  className,
  isLoading,
  type = "button",
  icon,
  ...props
}: LoadingLuttonProps) => {
  return (
    <Button type={type} className={cn("", className)} {...props}>
      {isLoading ? <LoaderCircle className="animate-spin" /> : icon}
      {children}
    </Button>
  );
};

export default LoadingLutton;
