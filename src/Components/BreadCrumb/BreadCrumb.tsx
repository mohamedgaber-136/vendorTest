import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment } from "react";

export function BreadCrumb() {
  const BreadCrumbData = [
    "قاعات",
    "تنظيم مناسبات",
    "ديكور",
    "اكسسوارات",
    "تصوير",
    "بوفيه وضيافه",
    "سيارات",
    "دعوات زفاف",
    "ازياء مناسبات",
    "المزيد",
  ];

  return (
    <div className="bg-primaryColor text-background p-3 hidden md:flex">
      <Breadcrumb>
        <BreadcrumbList>
          {BreadCrumbData.map((item, index) => (
            <Fragment key={`${index}-${item}`}>
              <BreadcrumbItem>
                <Link className="text-background font-semibold" to="/">
                  {item}
                </Link>
              </BreadcrumbItem>
              {index < BreadCrumbData.length - 1 && (
                <BreadcrumbSeparator className="text-background font-semibold" />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
