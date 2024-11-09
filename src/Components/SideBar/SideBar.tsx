import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Redux/authSlice";
import { Item } from "../../types";
import {  Settings } from "lucide-react";

interface SideBarProps {
  items: Item[];
  name: string;
}

export function SideBar({ items, name }: SideBarProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const location = useLocation();  // Get the current route
  const dispatch = useDispatch();

  const toggleCollapse = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <SidebarProvider className="relative min-h-[500px] sideBarMob max-w-[255px] max-h-[50svh] overflow-hidden max-md:bg-transparent">
      <Sidebar className="h-full shadow-xl bottom-0 absolute right-0 rounded-xl overflow-hidden bg-sidebar-default max-md:bg-transparent" >
        <SidebarContent>
          <SidebarGroup className="gap-4 h-full">
            <SidebarGroupLabel className="text-fontColor h-16 gap-2 flex flex-row-reverse justify-between">
              <div className="flex flex-col flex-1">
                <p className="text-xl font-semibold">{name}</p>
                <p className="text-primaryColor">الخدمه الرئيسيه</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </SidebarGroupLabel>
            <SidebarMenu className="gap-4">
              {items.map((item, index) => (
                <div key={item.title}>
                  <SidebarMenuItem
                    className={`p-2 rounded ${index !== items.length - 1 ? "border-b text-white border-gray-200" : ""} ${location.pathname.includes(item.url) ? "bg-primaryColor text-white" : ""}`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        to={!item.collapse ? item.url || "/" : "#"}
                        className="flex items-center justify-between space-x-2 font-semibold p-2 transition-colors duration-300"
                        onClick={(e) => {
                          if (item.collapse) {
                            e.preventDefault();
                            toggleCollapse(item.title);
                          }
                        }}
                      >
                        <div className="flex gap-2 items-center">
                          <span className={`font-semibold text-lg ${location.pathname.includes(item.url) ? "text-white" : "text-black"}`}>
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.collapse && openItems[item.title] && item.subItems && (
                    <div className="pl-4">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.title}>
                          <SidebarMenuItem className="p-2 ms-6" >
                            <SidebarMenuButton asChild  className={`p-2 rounded ${index !== items.length - 1 ? "border-b text-white border-gray-200" : ""} ${location.pathname.includes(item.url) ? "bg-primaryColor text-white" : ""}`}>
                              <Link
                                to={!subItem.collapse ? subItem.url || "/" : "#"}
                                className="flex items-center space-x-2 font-semibold me-8"
                                onClick={(e) => {
                                  if (subItem.collapse) {
                                    e.preventDefault();
                                    toggleCollapse(subItem.title);
                                  }
                                }}
                              >
                                <span className="text-fontColor">{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>

                          {subItem.collapse && openItems[subItem.title] && subItem.subItems && (
                            <div className="pl-8">
                              {subItem.subItems.map((subSubItem) => (
                                <SidebarMenuItem key={subSubItem.title}   className={` ms-16 p-2 rounded ${index !== items.length - 1 ? "border-b text-white border-gray-200" : ""} ${location.pathname.includes(item.url) ? "bg-primaryColor text-white" : ""}`}>
                                  <Link
                                    to={subSubItem.url || "/"}
                                    className="flex items-center space-x-2 font-semibold"
                                  >
                                    <span className="text-fontColor">{subSubItem.title}</span>
                                  </Link>
                                </SidebarMenuItem>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <SidebarMenuButton asChild onClick={() => dispatch(clearUser())}>
                <div className="flex gap-2 items-center justify-start space-x-2 font-semibold p-2 transition-colors duration-300 hover:bg-primaryColor hover:text-white">
                  <Settings className="text-fontColor" />
                  <span className="text-fontColor">تسجيل خروج</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger className="md:hidden flex items-center justify-center p-2 text-primaryColor rounded-md">
  <Settings className="h-6 w-6" />
</SidebarTrigger>
    </SidebarProvider>
  );
}
