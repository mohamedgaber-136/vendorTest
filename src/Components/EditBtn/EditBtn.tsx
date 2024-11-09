import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
// Define the Props type for ModalBtn component
interface ModalBtnProps {
  text: string;
formData:React.ReactNode;
}

export const EditBtn: React.FC<ModalBtnProps> = ({
  text,
  formData
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white shadow-none w-full  transition flex justify-center gap-2 rounded-md items-center ">
          <span className="text-black">{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex  flex-row justify-between items-start">
          <DialogTitle className="text-start p-4 text-fontColor ">
            {text}
          </DialogTitle>
          <DialogClose asChild>
            <button aria-label="Close" className="p-2">
              <X className="w-6 h-6 text-fontColor" />
            </button>
          </DialogClose>
        </DialogHeader>
     {formData}
      </DialogContent>
    </Dialog>
  );
};
