import { useState } from 'react';
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
import { ActionBtn } from '../ActionBtn/ActionBtn';

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
const ActionsList = [


  {
    content: 'تعديل',
    action: '/Services/:ServiceName'
  },
  {
    content: "حذف",
    action: "/Services/:ServiceName"
  },
]
export function SubServicesTable({ data }: MainServicesTableProps) {
  const [filteredData, setFilteredData] = useState<RowData[]>(data.data);
  return (
    <>
      <SearchField initialData={data.data} setData={setFilteredData} />
      <div className="overflow-x-auto mt-4">

        <Table className="bg-white rounded-xl ">
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

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={`row-${index}`} className="even:bg-gray-100">
                <TableCell className="font-medium text-right gap-3" style={{ width: "50px" }} dir="ltr">
                <SwitchbBTN is_active={row.is_active} />
                </TableCell>
                <TableCell className="font-medium text-right py-5 gap-3" style={{ width: "150px" }}>
                  {row.service.name}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  <button
                    className={`${row.is_active ? "bg-green-800" : "bg-red-800"
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
                  <ActionBtn ActionsList={ActionsList} itemName={row.service.name} data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
