// RootLayout Component
import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Item } from "../../types"; // Ensure this path is correct
import {  useSelector } from "react-redux";

export const RootLayout: React.FC = () => {
  const { user ,accessToken} = useSelector((state: any) => state.auth);
  const items: Item[] = [
    {
      title: "الخدمات الرئيسيه",
      url: "/home", // Ensure all top-level items have a URL
      
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
  ];

  return (
    <div>
      <Navbar />
      <div className=" mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items} name={user?.name_ar} />
          <div className="flex-grow   overflow-y-auto md:h-[calc(100vh-200px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
