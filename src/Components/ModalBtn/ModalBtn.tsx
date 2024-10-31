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
import * as Yup from "yup";
import { FieldType } from "../../types";

// Define the FieldType type for form fields


// Define the Props type for ModalBtn component
interface ModalBtnProps {
  text: string;
  Fields: FieldType[];
  initialValues: { [key: string]: string | File | null };
  validationSchema: Yup.ObjectSchema<any>;
  fieldWidth?: boolean;
}

export const ModalBtn: React.FC<ModalBtnProps> = ({
  text,
  Fields,
  validationSchema,
  initialValues,
  fieldWidth,
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
        <DialogHeader>
          <DialogTitle className="text-start p-4 text-fontColor">
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
};
