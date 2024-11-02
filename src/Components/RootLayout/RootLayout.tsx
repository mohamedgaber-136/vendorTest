// RootLayout Component
import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Item } from "../../types"; // Ensure this path is correct

export const RootLayout: React.FC = () => {
  const items: Item[] = [
    {
      title: "الخدمات الرئيسيه",
      url: "/", // Ensure all top-level items have a URL
      
      collapse: false,
    },
    {
      title: "اعدادات الحساب",
      url: "/profileSetting",
      collapse: false,
    },
    {
      title: "مشرفين",
      collapse: false,
      url:"/Supervisors"
    },
    // {
    //   title: "الدعم الفني",
    //   url: "/Support",
    //   collapse: false,
    // },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items} />
          <div className="flex-grow   overflow-y-auto md:h-[calc(100vh-200px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
