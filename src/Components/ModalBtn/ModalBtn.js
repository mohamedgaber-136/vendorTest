import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog";
import FormikData from "../FormikData/FormikData";
export const ModalBtn = ({ text, Fields, validationSchema, initialValues, fieldWidth, }) => {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-white hover:bg-white hover:-translate-y-1 transition flex justify-center gap-2 rounded-md items-center basis-1/8", children: [_jsx("span", { className: "text-fontColor", children: text }), _jsx(Plus, { className: "text-primaryColor" })] }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px] bg-background max-h-[80vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-start p-4 text-fontColor", children: text }) }), _jsx(FormikData, { Fields: Fields, initialValues: initialValues, validationSchema: validationSchema, btnText: text, fieldWidth: fieldWidth })] })] }));
};
