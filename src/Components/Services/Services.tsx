import { Home } from "lucide-react"; // Importing the Menu icon
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export const Services = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="flex cursor-pointer flex-col justify-center  gap-2 py-8 p-2 rounded-md items-center   border-primaryColor border-2" style={{minWidth:"125px"}} onClick={()=>navigate(`/Services/${data.service.name}`)}>
      <Home className="text-primaryColor" />
      <p className="text-fontColor text-xl font-semibold">{data.service.name} </p>
      <Badge className={data.is_active ? "bg-green-700" : "bg-red-700"}>
        {data.is_active ? "نشطه" : "غير نشطه"}
      </Badge>
    </div>
  );
};
