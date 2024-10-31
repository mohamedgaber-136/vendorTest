import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
export const NewDataBtn = ({ text, type }) => {
    return (_jsxs(Button, { type: type, className: "bg-white hover:bg-white hover:-translate-y-1 transition flex justify-center gap-2 rounded-md items-center basis-1/8", children: [_jsx("span", { className: "text-fontColor", children: text }), _jsx(Plus, { className: "text-primaryColor" })] }));
};
