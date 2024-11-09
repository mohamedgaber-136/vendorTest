import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { X } from "lucide-react";

// Define the Props type for ModalBtn component
interface ModalBtnProps {
  text: string;
formData:React.ReactNode;
}

export const ModalBtn: React.FC<ModalBtnProps> = ({
  text,
  formData
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white hover:-translate-y-1 transition flex justify-center gap-2 rounded-md items-center basis-1/8">
          <span className="text-fontColor">{text}</span>
          <Plus className="text-primaryColor" />
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
