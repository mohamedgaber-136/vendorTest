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
import { ProductForm } from '../Forms/ProductForm';
import { EditBtn } from '../EditBtn/EditBtn';

interface OfferData {
  id: string;
  name: string;
  is_active: boolean;
  price: number | null;
  old_price?: number | null;
  title: string;
  start_date?: string;
  end_date?: string;
  views_count: number;
  likes_count: number;
  shares_count: number;
  is_active_text: string;
  city: { name: string };
  service: { name: string };
  image: { url: string };
}

interface Action {
  content: string;
  action: ((data: OfferData) => JSX.Element) | string;
  type: 'navigate' | 'modal' | 'delete';
}

interface ProductsTableProps {
  data?: {
    data: OfferData[];
  };
}

const headers = [
  "منتجات",
  "الحاله",
  " ألمحافظه",
  "السعر",
  "المشاهدات",
  "الاعجاب",
  "المشاركه",
];

const ActionsList: Action[] = [
  {
    content: 'تعديل',
    type: "modal",
    action: (data: OfferData) => (
      <EditBtn
        text="تعديل منتج"
        formData={<ProductForm data={data} type={'update'} />}
      />
    ),
  },
  {
    content: "حذف",
    action: "products/id",
    type: "delete",
  },
];

export const ProductsTable: FC<ProductsTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<OfferData[] | undefined>(data?.data);

  return (
    <div className='w-full'>
      <h2 className='text-fontColor w-full text-4xl mb-4 font-semibold'>المنتجات</h2>
      <SearchField initialData={data?.data} setData={setFilteredData} />
      <div className="overflow-x-auto mt-4">
        <Table className="bg-white rounded-xl">
          <TableHeader className="rounded-3xl w-full">
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
            {filteredData && filteredData.length ? (
              filteredData.map((row, index) => (
                <TableRow key={`row-${index}`} className="even:bg-gray-100">
                  <TableCell className="font-medium text-right" style={{ width: "50px" }} dir="ltr">
                  <SwitchbBTN is_active={row.is_active} />
                  </TableCell>
                  <TableCell className="font-medium flex flex-col text-right py-5" style={{ width: "150px" }}>
                    <small className='text-right'>                    {row.name}
                    </small>
                    <img src={row.image.url} alt={row.title} style={{ width: '50px' }} />
                  </TableCell>
                  <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                    <button
                      className={`px-4 py-2 border text-white rounded-lg ${row.is_active_text === "Active" ? "bg-green-800" : "bg-red-800"}`}
                    >
                      {row.is_active_text === "Active" ? "نشط" : "معلق"}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                    {row.city.name}
                  </TableCell>
                  <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                    {row.service.name}
                  </TableCell>
                  <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                    {row.view_count}
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
                <TableCell colSpan={headers.length + 2} className="text-center p-5">
                  لا توجد بيانات حالياً
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
