import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, } from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../Redux/authSlice";
import { Menu, Settings } from "lucide-react";
export function SideBar({ items }) {
    const [openItems, setOpenItems] = useState({});
    const [activeItem, setActiveItem] = useState("/");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    return (_jsxs(SidebarProvider, { className: "relative min-h-[500px] sideBarMob max-w-[255px] max-h-[50svh] overflow-hidden max-md:bg-transparent", children: [_jsx(Sidebar, { className: "h-full bottom-0 absolute right-0 bg-sidebar-default max-md:bg-transparent", children: _jsx(SidebarContent, { children: _jsxs(SidebarGroup, { className: "gap-4", children: [_jsxs(SidebarGroupLabel, { className: "text-fontColor flex justify-between", children: [_jsx(Avatar, { children: _jsx(AvatarImage, { src: "https://github.com/shadcn.png" }) }), _jsxs("p", { className: "text-xl font-semibold", children: [" ", user?.name_ar, " "] })] }), _jsxs(SidebarMenu, { className: "gap-4", children: [items.map((item, index) => (_jsxs("div", { children: [_jsx(SidebarMenuItem, { className: `p-2 rounded ${index !== items.length - 1
                                                    ? "border-b text-white border-gray-200"
                                                    : ""} ${activeItem === item.url ? "bg-primaryColor" : ""}`, children: _jsx(SidebarMenuButton, { asChild: true, children: _jsx(Link, { to: !item.collapse ? item.url || "/" : "#", className: "flex items-center justify-between space-x-2 font-semibold p-2 transition-colors duration-300", onClick: (e) => {
                                                            const itemKey = item.title;
                                                            if (item.collapse) {
                                                                e.preventDefault(); // Prevent navigation if collapse is true
                                                                setOpenItems((prev) => ({
                                                                    ...prev,
                                                                    [itemKey]: !prev[itemKey],
                                                                }));
                                                            }
                                                            else {
                                                                setActiveItem(item.url || "/");
                                                            }
                                                        }, children: _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx(item.icon, { className: `${activeItem === item.url
                                                                        ? "text-white"
                                                                        : "text-fontColor"}` }), _jsx("span", { className: `${activeItem === item.url
                                                                        ? "text-white"
                                                                        : "text-fontColor"}`, children: item.title })] }) }) }) }), item.collapse && openItems[item.title] && item.subItems && (_jsx("div", { className: "pl-4", children: item.subItems.map((subItem) => (_jsx(SidebarMenuItem, { className: "p-2", children: _jsxs(Link, { to: subItem.url || "/", className: "flex items-center space-x-2 font-semibold", onClick: () => setActiveItem(subItem.url || "/"), children: [_jsx(subItem.icon, { className: "text-fontColor" }), _jsx("span", { className: "text-fontColor", children: subItem.title })] }) }, subItem.title))) }))] }, item.title))), _jsx(SidebarMenuButton, { asChild: true, onClick: () => dispatch(clearUser()), children: _jsxs("div", { className: "flex gap-2 items-center justify-start space-x-2 font-semibold p-2 transition-colors duration-300 hover:bg-primaryColor hover:text-white", children: [_jsx(Settings, { className: "text-fontColor" }), _jsx("span", { className: "text-fontColor", children: "\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C" })] }) })] })] }) }) }), _jsx(SidebarTrigger, { className: "md:hidden flex items-center justify-center p-2 text-primaryColor rounded-md", children: _jsx(Menu, { className: "h-6 w-6" }) })] }));
}
