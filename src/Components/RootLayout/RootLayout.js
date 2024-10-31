import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// RootLayout Component
import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Calendar, Home, Inbox, Search } from "lucide-react";
export const RootLayout = () => {
    const items = [
        {
            title: "الخدمات الرئيسيه",
            url: "/", // Ensure all top-level items have a URL
            icon: Home,
            collapse: false,
        },
        {
            title: "اعدادات الحساب",
            url: "/profileSetting",
            icon: Inbox,
            collapse: false,
        },
        {
            title: "مشرفين",
            icon: Calendar,
            collapse: true,
            subItems: [
                {
                    title: "كل مشرفين",
                    url: "/Supervisors", // SubItems must also have a URL
                    icon: Inbox,
                },
            ],
        },
        {
            title: "الدعم الفني",
            url: "/Support",
            icon: Search,
            collapse: false,
        },
    ];
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsxs("div", { className: "container mx-auto px-4", children: [_jsx(AdsCard, {}), _jsxs("div", { className: "flex", children: [_jsx(SideBar, { items: items }), _jsx("div", { className: "flex-grow", children: _jsx(Outlet, {}) })] })] })] }));
};
