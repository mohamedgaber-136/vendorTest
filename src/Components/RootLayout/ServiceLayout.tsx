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

export const ServiceLayout = () => {
  // Menu items.
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
        { title: " الخدمه الاضافيه", url: "/additional-service" },
        { title: " العروض والباقات", url: "/offers-and-packages" },
        { title: " المنشورات", url: "/posts" },
        { title: " القصص", url: "/stories" },
        { title: " المنتجات", url: "/products" },
        { title: " الفروع", url: "/branches" },
        { title: " لينكات خارجيه", url: "/external-links" },
      ],
    },
    {
      title: "مدير الاعلانات",
      icon: Calendar,
      collapse: true,
      subItems: [
        { title: "a- اعلاناتي", url: "/my-ads" },
        { title: "b- ترويج", url: "/promotion" },
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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items} />
          <div className="flex-grow overflow-y-auto md:h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
