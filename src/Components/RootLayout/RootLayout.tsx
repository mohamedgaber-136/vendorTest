import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
 
} from "lucide-react";
export const RootLayout = () => {
   // Menu items.
   const items = [
    {
      title: "الخدمات الرئيسيه",
      url: "/",
      icon: Home,
      collapse:false,
    },
    {
      title: "اعدادات الحساب",
      url: "/profileSetting",
      icon: Inbox,
      collapse:false,
    },
    {
      title: "مشرفين",
      icon: Calendar,
      subItems: [{ title: "كل مشرفين", url: "/Supervisors" }],
      collapse:true,
    },
    {
      title: "الدعم الفني",
      url: "/Support",
      icon: Search,
      collapse:false,
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items}/>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
