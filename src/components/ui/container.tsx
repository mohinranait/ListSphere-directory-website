import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-2 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
