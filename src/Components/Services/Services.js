import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home } from "lucide-react"; // Importing the Home icon
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
export const Services = ({ data }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex cursor-pointer flex-col justify-center gap-2 py-8 p-2 rounded-md items-center border-primaryColor border-2", style: { minWidth: "125px" }, onClick: () => navigate(`/Services/${data.service.name}`), children: [_jsx(Home, { className: "text-primaryColor" }), _jsx("p", { className: "text-fontColor text-xl font-semibold", children: data.service.name }), _jsx(Badge, { className: data.is_active ? "bg-green-700" : "bg-red-700", children: data.is_active ? "نشطه" : "غير نشطه" })] }));
};
