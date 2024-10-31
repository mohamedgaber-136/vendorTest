import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "../ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";
export function BreadCrumb() {
    const BreadCrumbData = [
        "قاعات",
        "تنظيم مناسبات",
        "ديكور",
        "اكسسوارات",
        "تصوير",
        "بوفيه وضيافه",
        "سيارات",
        "دعوات زفاف",
        "ازياء مناسبات",
        "المزيد",
    ];
    return (_jsx("div", { className: "bg-primaryColor text-background p-3 hidden md:flex ", children: _jsx(Breadcrumb, { children: _jsx(BreadcrumbList, { children: BreadCrumbData.map((item, index) => (_jsxs(Fragment, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { children: _jsx(Link, { className: "text-background font-semibold", to: "/", children: item }) }) }), _jsx(BreadcrumbSeparator, { className: "text-background font-semibold" })] }, `${index}-${item}`))) }) }) }));
}
