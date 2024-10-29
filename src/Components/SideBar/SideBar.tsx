import { useState } from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/Redux/authSlice";

export function SideBar({ items }) {
  const [openItems, setOpenItems] = useState({});
  const [activeItem, setActiveItem] = useState("/");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <SidebarProvider className="relative min-h-[500px] sideBarMob max-w-[255px] max-h-[50svh] overflow-hidden max-md:bg-transparent">
      <Sidebar className="h-full bottom-0 absolute right-0 bg-sidebar-default max-md:bg-transparent">
        <SidebarContent>
          <SidebarGroup className="gap-4 ">
            <SidebarGroupLabel className="text-fontColor flex justify-between ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <p className="text-xl font-semibold"> {user?.name_ar} </p>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                {items.map((item, index) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`p-2 rounded ${
                      index !== items.length - 1
                        ? "border-b text-white border-gray-200"
                        : ""
                    } ${activeItem === item.url ? "bg-primaryColor" : ""}`} 
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className="flex items-center justify-between space-x-2 font-semibold p-2 transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault(); 
                          const itemKey = item.title; 

                          if (item.collapse) {
                            setOpenItems((prev) => ({
                              ...prev,
                              [itemKey]: !prev[itemKey],
                            }));
                          } else {
                            setActiveItem(item.url);
                          }
                        }}
                      >
                        <div className="flex gap-2 items-center justify-between space-x-2 font-semibold p-2 transition-colors duration-300">
                          <item.icon
                            className={`${
                              activeItem === item.url
                                ? "text-white"
                                : "text-fontColor"
                            }`}
                          />
                          <span
                            className={`${
                              activeItem === item.url
                                ? "text-white"
                                : "text-fontColor"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {item.subItems &&
                          (openItems[item.title] ? (
                            <ChevronDown className="text-fontColor ml-2" />
                          ) : (
                            <ChevronRight className="text-fontColor ml-2" />
                          ))}
                      </Link>
                    </SidebarMenuButton>
                    {item.subItems && openItems[item.title] && item.collapse && (
                      <div className="mr-16 my-2 relative flex flex-col gap-4">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                to={subItem.url}
                                className="flex items-center space-x-2 font-semibold p-2 transition-colors duration-300 text-white hover:bg-white hover:text-black"
                              >
                                <span className="text-fontColor">
                                  {subItem.title}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
                <SidebarMenuButton asChild onClick={() => dispatch(clearUser())}>
                  <div className="flex gap-2 items-center justify-start space-x-2 font-semibold p-2 transition-colors duration-300 hover:bg-primaryColor hover:text-white">
                    <Settings className="text-fontColor" />
                    <span className="text-fontColor">تسجيل خروج</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarTrigger className="md:hidden flex items-center justify-center p-2 text-primaryColor rounded-md">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
    </SidebarProvider>
  );
}
