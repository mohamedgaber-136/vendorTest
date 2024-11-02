import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../Redux/authSlice";
import { Item } from "../../types";
import { Menu, Settings } from "lucide-react";

interface SideBarProps {
  items: Item[];
}

export function SideBar({ items }: SideBarProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<string>("/");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <SidebarProvider className="relative min-h-[500px] sideBarMob max-w-[255px] max-h-[50svh] overflow-hidden max-md:bg-transparent">
      <Sidebar className="h-full bottom-0 absolute right-0 bg-sidebar-default max-md:bg-transparent">
        <SidebarContent>
          <SidebarGroup className="gap-4">
            <SidebarGroupLabel className="text-fontColor gap-2 flex flex-row-reverse justify-between">
              <div className="flex flex-col flex-1">

              <p className="text-xl font-semibold"> {user?.name_ar} </p>
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
                    className={`p-2 rounded ${index !== items.length - 1
                      ? "border-b text-white border-gray-200"
                      : ""
                    } ${activeItem === item.url ? "bg-primaryColor" : ""}`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        to={!item.collapse ? item.url || "/" : "#"}
                        className="flex items-center justify-between space-x-2 font-semibold p-2 transition-colors duration-300"
                        onClick={(e) => {
                          const itemKey = item.title;
                          if (item.collapse) {
                            e.preventDefault(); // Prevent navigation if collapse is true
                            setOpenItems((prev) => ({
                              ...prev,
                              [itemKey]: !prev[itemKey],
                            }));
                          } else {
                            setActiveItem(item.url || "/");
                          }
                        }}
                      >
                        <div className="flex gap-2 items-center">
                       
                          <span
                            className={` font-semibold text-lg ${activeItem === item.url
                              ? "text-white "
                              : "text-black"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Render sub-items if item.collapse is true and the item is open */}
                  {item.collapse && openItems[item.title] && item.subItems && (
                    <div className="pl-4">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.title} className="p-2">
                          <Link
                            to={subItem.url || "/"}
                            className="flex items-center space-x-2 font-semibold"
                            onClick={() => setActiveItem(subItem.url || "/")}
                          >
                            <span className="text-fontColor">{subItem.title}</span>
                          </Link>
                        </SidebarMenuItem>
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
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
    </SidebarProvider>
  );
}
