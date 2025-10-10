import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import LoadingButton from "../loading-button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callBack?: () => void;
  title?: string;
  subTitle?: string;
  isLoading?: boolean;
};
const DeleteModal = ({ open, setOpen, callBack, isLoading }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[320px]">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto border-2 border-red-600 text-red-600">
            <X size={20} />
          </div>
          <DialogTitle className="text-center">Are you sure?</DialogTitle>
          <DialogDescription className="text-center">
            Do you really want to delete these record ? This process can not be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => setOpen(false)} variant={"outline"}>
            Cancel
          </Button>
          <LoadingButton
            callBack={callBack}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white"
            isLoading={isLoading}
          >
            Delete
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
