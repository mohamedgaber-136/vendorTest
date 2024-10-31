import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Calendar, Home, Inbox, Search } from "lucide-react";
// Define the type for the component
export const ServiceLayout = () => {
    // Menu items
    const items = [
        {
            title: " الاحصائيات",
            url: "/Services",
            icon: Home,
            collapse: false,
        },
        {
            title: " الخدمه الرئيسيه",
            url: "/main-service",
            icon: Inbox,
            collapse: false,
        },
        {
            title: " الصفحه الرئيسيه",
            icon: Calendar,
            collapse: true,
            subItems: [
                { title: " الخدمه الاضافيه", url: "/additional-service", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " العروض والباقات", url: "/offers-and-packages", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " المنشورات", url: "/posts", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " القصص", url: "/stories", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " المنتجات", url: "/products", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " الفروع", url: "/branches", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: " لينكات خارجيه", url: "/external-links", icon: Inbox, collapse: false }, // Add icon and collapse
            ],
        },
        {
            title: "مدير الاعلانات",
            icon: Calendar,
            collapse: true,
            subItems: [
                { title: "a- اعلاناتي", url: "/my-ads", icon: Inbox, collapse: false }, // Add icon and collapse
                { title: "b- ترويج", url: "/promotion", icon: Inbox, collapse: false }, // Add icon and collapse
            ],
        },
        {
            title: " باقات جوازي",
            url: "/my-packages",
            icon: Inbox,
            collapse: false,
        },
        {
            title: " المفضله",
            url: "/favorites",
            icon: Inbox,
            collapse: false,
        },
        {
            title: " اشعاراتي",
            url: "/notifications",
            icon: Inbox,
            collapse: false,
        },
        {
            title: " الدعم الفني",
            url: "/support",
            icon: Search,
            collapse: false,
        },
    ];
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsxs("div", { className: "container mx-auto px-4", children: [_jsx(AdsCard, {}), _jsxs("div", { className: "flex", children: [_jsx(SideBar, { items: items }), _jsxs("div", { className: "flex-grow overflow-y-auto md:h-[calc(100vh-200px)]", children: [" ", _jsx(Outlet, {})] })] })] })] }));
};
