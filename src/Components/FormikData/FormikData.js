import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../ui/select";
import { Loader } from "../Loader/Loader";
import { useAddItemMutation } from "../../Redux/api";
const FormikData = ({ Fields, initialValues, validationSchema, btnText, fieldWidth, }) => {
    const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const endpoint = "service-vendors";
            const newItem = { ...values };
            await addItem({ endpoint, newItem }).unwrap();
            console.log("Item added successfully");
        }
        catch (error) {
            console.error("Failed to add item:", error);
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: (formik) => (_jsxs(Form, { className: "flex flex-col gap-3", children: [Fields.map((item, index) => (_jsx(Fragment, { children: item.type === "radio" ? (_jsxs(Fragment, { children: [_jsx(Label, { children: item.label }), _jsx("div", { role: "group", "aria-labelledby": item.name, className: "flex", children: item.options?.map((option, idx) => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Field, { type: "radio", name: item.name, value: option.value, className: "mr-2" }), option.label] }, idx))) }), _jsx(ErrorMessage, { name: item.name, component: "div", className: "text-red-500 text-sm" })] })) : item.type === "file" ? (_jsxs(_Fragment, { children: [_jsx(Label, { htmlFor: item.name, children: item.label }), _jsx(Field, { name: item.name, children: ({ field }) => (_jsx(Input, { ...field, type: "file", id: item.name, className: `${fieldWidth ? "w-full" : "md:w-1/4"} sm:w-full bg-white`, isInvalid: !!formik.errors[item.name] && formik.touched[item.name] })) }), _jsx(ErrorMessage, { name: item.name, component: "div", className: "text-red-500 text-sm" })] })) : item.type === "select" ? (_jsxs(_Fragment, { children: [_jsx(Label, { htmlFor: item.name, children: item.label }), _jsx(Field, { name: item.name, children: ({ field, form }) => (_jsxs(Select, { value: field.value, onValueChange: (value) => form.setFieldValue(item.name, value), children: [_jsx(SelectTrigger, { className: `${fieldWidth ? "w-full" : "md:w-1/2"} sm:w-full bg-white`, dir: "rtl", children: _jsx(SelectValue, { placeholder: item.placeHolder || "Select an option" }) }), _jsx(SelectContent, { children: _jsx(SelectGroup, { children: item.options?.map((option, idx) => (_jsx(SelectItem, { value: option.value, children: option.label }, idx))) }) })] })) }), _jsx(ErrorMessage, { name: item.name, component: "div", className: "text-red-500 text-sm" })] })) : (_jsxs("div", { children: [_jsx(Field, { name: item.name, children: ({ field }) => (_jsx(Input, { ...field, type: "text", id: item.name, className: `${fieldWidth ? "w-full" : "md:w-1/2"} sm:w-full bg-white`, placeholder: item.placeHolder, isInvalid: !!formik.errors[item.name] && formik.touched[item.name] })) }), _jsx(ErrorMessage, { name: item.name, component: "div", className: "text-red-500 text-sm" })] })) }, index))), _jsx(Button, { type: "submit", disabled: !formik.isValid || formik.isSubmitting, className: `${fieldWidth ? "w-full" : "md:w-1/4"} sm:w-full bg-primaryColor text-white hover:white`, children: btnText }), isLoading && _jsx(Loader, {}), isSuccess && _jsx("div", { className: "text-green-500", children: "Item added successfully!" }), isError && _jsx("div", { className: "text-red-500", children: "Failed to add item" })] })) }));
};
export default FormikData;
