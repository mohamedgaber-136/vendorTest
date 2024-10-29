import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export const NewDataBtn = ({text,type}) => {
  return (
    <Button type={type} className="bg-white hover:bg-white hover:-translate-y-1 transition flex  justify-center  gap-2 rounded-md items-center  basis-1/8  ">
      <span className="text-fontColor ">{text}</span>
      <Plus className="text-primaryColor" />
    </Button>
  );
};
