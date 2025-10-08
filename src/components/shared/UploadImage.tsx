import React from "react";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const UploadImage = ({ className }: Props) => {
  return (
    <div>
      <div>
        <Label
          htmlFor="file"
          className={cn(
            "border  cursor-pointer rounded-md p-3 min-h-[120px]",
            className
          )}
        >
          <input type="file" hidden id="file" />
          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              <Upload />
            </div>
            <p className="text-center text-gray-500">
              Upload image OR <br />{" "}
              <span className="text-primary">Drag & Drop</span>
            </p>
          </div>
        </Label>
      </div>
    </div>
  );
};

export default UploadImage;
