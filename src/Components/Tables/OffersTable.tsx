import { useState, FC } from 'react';
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

interface OfferData {
  id: string;
  is_active: boolean;
  price: number | null;
  old_price?: number | null; // Added to match data
  title: string; // Added title property
  start_date?: string; // Optional dates
  end_date?: string;
  views_count: number;
  likes_count: number;
  shares_count: number;
}

interface Action {
  content: string;
  action: string;
  type: 'navigate' | 'modal' | 'delete'; // fixed typo
}

interface OffersTableProps {
  data?: {
    data: OfferData[];
  };
}

const headers = [
  "اسم العرض",
  "الحاله",
  "السعر قبل",
  "السعر بعد",
  "من",
  "الي",
  "المشاهدات",
  "الاعجاب",
  "المشاركه",
];

const ActionsList: Action[] = [
  {
    content: 'عرض',
    type: 'navigate', // corrected typo
    action: "/Services/:ServiceName",
  },
  {
    content: 'تعديل',
    type: "modal",
    action: '/Services/:ServiceName',
  },
  {
    content: "حذف",
    action: "offers/id",
    type: "delete",
  },
];

export const OffersTable: FC<OffersTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<OfferData[] | undefined>(data?.data);

  return (
    <>
      <h2 className='text-fontColor w-full text-4xl mb-4 font-semibold'>العروض</h2>
      <SearchField initialData={data?.data} setData={setFilteredData} />
      
      <Table className="bg-white mt-4 rounded-xl border-0">
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
          {filteredData && filteredData.length ? (
            filteredData.map((row, index) => (
              <TableRow key={`row-${index}`} className="even:bg-gray-100">
                <TableCell className="font-medium text-right gap-3" style={{ width: "50px" }} dir="ltr">
                  <SwitchbBTN />
                </TableCell>
                <TableCell className="font-medium text-right py-5 gap-3" style={{ width: "150px" }}>
                  {row.title}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  <button
                    className={`${row.is_active ? "bg-green-800" : "bg-red-800"} px-4 py-2 border border-gray-400 text-white rounded-lg`}
                  >
                    {row.is_active ? "نشط" : "معلق"}
                  </button>
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.old_price}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.price}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.start_date}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.end_date}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.views_count}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.likes_count}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.shares_count}
                </TableCell>
                <TableCell className="text-right" style={{ width: "50px" }}>
                  <ActionBtn ActionsList={ActionsList} itemName={row.title} data={row} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center p-5">
                No Data Yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
