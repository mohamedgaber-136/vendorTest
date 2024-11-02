import {  useState } from 'react';
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SwitchbBTN } from "../SwitchBtn/SwitchBtn";
import { SearchField } from "../SearchField/SearchField";

type Service = {
  name: string;
  type: string;
  created_at: string;
  view_count: number;
  likes_count: number;
  shares_count: number;
};

type RowData = {
  id: string;
  is_active: boolean;
  price?: number | null;
  service: Service;
};

interface MainServicesTableProps {
  data: {
    data: RowData[];
  };
}

// Sample headers for the table
const headers = [
  "الخدمه الرئيسيه",
  "الحاله",
  "السعر",
  "نوع الحساب",
  "التاريخ",
  "المشاهدات",
  "الاعجاب",
  "المشاركه",
];

export function MainServicesTable({ data }: MainServicesTableProps) {
  const [filteredData, setFilteredData] = useState<RowData[]>(data.data);
  return (
    <>
      <SearchField initialData={data.data} setData={setFilteredData} />
      <Table className="bg-white mb-4 rounded-xl border-0">
        <TableHeader className="rounded-3xl">
          <TableRow>
            <TableHead className="text-right text-fontColor px-3 font-semibold" style={{ width: "50px" }} />
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="text-right text-fontColor px-3 font-semibold"
                style={{ width: "150px" }}
              >
                {header}
              </TableHead>
            ))}
            <TableHead
              className="text-right text-fontColor px-3 font-semibold"
              style={{ width: "50px" }}
            />
          </TableRow>
        </TableHeader>
      </Table>

      <Table className="bg-white">
        <TableBody>
          {filteredData.map((row, index) => (
            <TableRow key={`row-${index}`} className="even:bg-gray-100">
              <TableCell className="font-medium text-right gap-3" style={{ width: "50px" }} dir="ltr">
                <SwitchbBTN />
              </TableCell>
              <TableCell className="font-medium text-right py-5 gap-3" style={{ width: "150px" }}>
                {row.service.name}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                <button
                  className={`${
                    row.is_active ? "bg-green-800" : "bg-red-800"
                  } px-4 py-2 border border-gray-400 text-white rounded-lg`}
                >
                  {row.is_active ? "نشط" : "معلق"}
                </button>
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.price == null ? "غير معرف" : row.price}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.service.type}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.service.created_at}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.service.view_count}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.service.likes_count}
              </TableCell>
              <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                {row.service.shares_count}
              </TableCell>
              <TableCell className="text-right" style={{ width: "50px" }}>
                <MoreVertical className="w-5 h-5 text-gray-600 bg-transparent cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}