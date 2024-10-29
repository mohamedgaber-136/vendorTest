import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormikData from "../FormikData/FormikData";

export function ModalBtn({ text, Fields, validationSchema, initialValues ,fieldWidth}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white hover:-translate-y-1 transition flex  justify-center  gap-2 rounded-md items-center  basis-1/8  ">
          <span className="text-fontColor ">{text}</span>
          <Plus className="text-primaryColor" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-start p-4 text-fontColor ">
            {text}
          </DialogTitle>
        </DialogHeader>
        <FormikData
          Fields={Fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          btnText={text}
          fieldWidth={fieldWidth}
        />
      </DialogContent>
    </Dialog>
  );
}
