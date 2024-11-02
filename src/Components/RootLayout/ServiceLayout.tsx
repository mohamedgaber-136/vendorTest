import { Outlet } from "react-router-dom";
import { AdsCard } from "../AdsCard/AdsCard";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../SideBar/SideBar";
import { Item } from "../../types";


// Define the type for the component
export const ServiceLayout: React.FC = () => {
  // Menu items
  const items: Item[] = [
    {
      title: " الاحصائيات",
      url: "/Services",
      collapse: false,
    },
    {
      title: " الخدمه الرئيسيه",
      url: "/main-service",
      collapse: false,
    },
    {
      title: " الصفحه الرئيسيه",
      collapse: true,
      subItems: [
        { title: " الخدمه الاضافيه", url: "/additional-service",  }, // Add icon and collapse
        { title: " العروض والباقات", url: "/offers-and-packages",  }, // Add icon and collapse
        { title: " المنشورات", url: "/posts",  }, // Add icon and collapse
        { title: " القصص", url: "/stories",  }, // Add icon and collapse
        { title: " المنتجات", url: "/products",  }, // Add icon and collapse
        { title: " الفروع", url: "/branches",  }, // Add icon and collapse
        { title: " لينكات خارجيه", url: "/external-links",  }, // Add icon and collapse
      ],
    },
    {
      title: "مدير الاعلانات",
      collapse: true,
      subItems: [
        { title: "a- اعلاناتي", url: "/my-ads",  }, // Add icon and collapse
        { title: "b- ترويج", url: "/promotion",  }, // Add icon and collapse
      ],
    },
    {
      title: " باقات جوازي",
      url: "/my-packages",
      collapse: false,
    },
    {
      title: " المفضله",
      url: "/favorites",
      collapse: false,
    },
    {
      title: " اشعاراتي",
      url: "/notifications",
      collapse: false,
    },
    {
      title: " الدعم الفني",
      url: "/support",
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
