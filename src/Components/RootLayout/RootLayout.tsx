// RootLayout Component
import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Calendar, Home, Inbox, Search } from "lucide-react";
import { Item } from "../../types"; // Ensure this path is correct

export const RootLayout: React.FC = () => {
  const items: Item[] = [
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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items} />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
