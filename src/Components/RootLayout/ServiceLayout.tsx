import { Outlet, useParams } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Item } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";


// Define the type for the component
export const ServiceLayout: React.FC = () => {
  const { ServiceName } = useParams()
  // Menu items
  const { data } = useSelector((state: RootState) => state.service);
  const id = data ? data.id : null;

  const items: Item[] = [
    {
      title: " الاحصائيات",
      url: "",
      collapse: false,
    },
    {
      title: "  اعدادت ملف الخدمه",
      collapse: true,
      subItems: [
        { title: " الخدمه ", url: "EditService", }, // Add icon and collapse
        { title: "  الخدمه الفرعيه  ", url: "SubServices", }, // Add icon and collapse
        // Add icon and collapse
        { title: "  العروض", url: "Offers", }, // Add icon and collapse
        { title: " المنشورات ", url: "Posts", }, // Add icon and collapse
        { title: "  المنتجات", url: "Products", }, // Add icon and collapse
        { title: "  الفروع", url: "branches", }, // Add icon and collapse
        { title: "  القصص", url: "story", }, // Add icon and collapse
      ],
    },

    {
      title: " مدير الاعلانات",
      collapse: true,
      subItems: [
        { title: "علاناتي", url: "ads", }, // Add icon and collapse
        { title: "ترويج", url: "promotion", }, // Add icon and collapse
      ],
    },
    {
      title: " باقات جوازي",
      url: "/my-packages",
      collapse: false,
    },

    {
      title: " اشعاراتي",
      url: "/notifications",
      collapse: false,
    },

  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <AdsCard />
        <div className="flex">
          <SideBar items={items} name={ServiceName ? ServiceName : ''} />
          <div className="flex-grow overflow-y-auto md:h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <Outlet context={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
