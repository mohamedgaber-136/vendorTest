import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ModalBtn } from "../ModalBtn/ModalBtn";
import * as Yup from "yup";
import { MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
// Sample invoices data
const invoices = [
    {
        name: "Full Name 1",
        password: "كلمه السر",
        email: "email1@example.com",
        roles: "مدير عام",
        service: "ايجار سياره",
        startedAt: "10/15/2024",
        active: false,
    },
    {
        name: "Full Name 2",
        password: "كلمه السر",
        email: "email2@example.com",
        roles: "مدير عام",
        service: "ايجار سياره",
        startedAt: "10/15/2024",
        active: true,
    },
    {
        name: "Full Name 3",
        password: "كلمه السر",
        email: "email3@example.com",
        roles: "مدير عام",
        service: "ايجار سياره",
        startedAt: "10/15/2024",
        active: false,
    },
    // Add more entries as needed...
];
// Define fields for the form
const Fields = [
    {
        type: "text",
        placeHolder: "اسم المشرف",
        name: "name",
    },
    {
        type: "email",
        placeHolder: "البريد الالكتروني",
        name: "email",
    },
    {
        type: "password",
        placeHolder: "كلمه السر",
        name: "password",
    },
    {
        type: "text",
        placeHolder: "الخدمه",
        name: "service",
    },
    {
        type: "text",
        name: "job",
        placeHolder: "اسم الوظيفه",
    },
];
// Initial values for the form
const initialValues = {
    name: "",
    email: "",
    password: "",
    service: "",
    job: "",
};
// Validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name should be at least 3 characters")
        .required("اسم المشرف مطلوب"),
    email: Yup.string()
        .email("ادخل بريد الكتروني صحيح")
        .required("البريد الالكتروني مطلوب"),
    password: Yup.string()
        .min(6, "Password should be at least 6 characters")
        .required("كلمه السر مطلوبه"),
    service: Yup.string().required("الخدمه مطلوبه"),
    job: Yup.string().required("اسم الوظيفه مطلوب"),
});
// Function to create header cells for the table
const createHeadCells = (data) => {
    const keys = Object.keys(data[0] || {});
    return keys.map((key) => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
};
const headCells = createHeadCells(invoices);
// Function to render table cells based on the keys
const checkKeys = (key, row) => {
    if (key === "active") {
        return (_jsx(TableCell, { className: `font-medium px-3 text-center py-5 ${row[key] ? "text-green-600" : "text-red-600"}`, style: { width: "150px" }, children: row[key] ? "نشطه" : "غير نشطه" }, key));
    }
    else {
        return (_jsx(TableCell, { className: "font-medium px-3 text-right py-5", style: { width: "150px" }, children: row[key] }, key));
    }
};
// Main Table component
export function TableComp() {
    return (_jsxs(_Fragment, { children: [_jsx(Table, { className: "bg-white mb-4 rounded-xl border-0", children: _jsx(TableHeader, { className: "rounded-3xl", children: _jsx(TableRow, { children: headCells.map((item) => (_jsx(TableHead, { className: "text-right text-fontColor px-3 font-semibold", style: { width: "150px" }, children: item.label }, item.id))) }) }) }), _jsx(Table, { className: "bg-white", children: _jsx(TableBody, { children: invoices.map((row, index) => (_jsxs(TableRow, { className: "even:bg-gray-100", children: [Object.keys(row).map((key) => checkKeys(key, row)), _jsx(TableCell, { className: "text-right", style: { width: "50px" }, children: _jsx(MoreVertical, { className: "w-5 h-5 text-gray-600 bg-transparent cursor-pointer" }) })] }, `row-${index}`))) }) }), _jsx("div", { className: "flex justify-end my-5", children: _jsx(ModalBtn, { text: "\u0627\u0636\u0627\u0641\u0647 \u0645\u0634\u0631\u0641", Fields: Fields, initialValues: initialValues, validationSchema: validationSchema, fieldWidth: true }) })] }));
}
