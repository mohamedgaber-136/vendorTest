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
import { EditBtn } from '../EditBtn/EditBtn';
import { BrancheForm } from '../Forms/BrancheForm';

interface OfferData {
  id: string;
  is_active: boolean;
  price: number | null;
  service: {
    name: string;
    type: string;
    created_at: string;
    view_count: number;
    likes_count: number;
    shares_count: number;
  };
}

interface Action {
  action: any;
  content: React.ReactNode;
  type: 'navigat' | 'modal' | 'delete';
}

interface BranchesTableProps {
  data?: {
    data: OfferData[];
  };
}

const headers = [
  "اسم الفرع",
  "العنوان بالتفصيل",
  "الحاله",
];

const ActionsList: Action[] = [
  {
    content: 'تعديل',
    action:   (data: { id: string }) => (
      <EditBtn
        text="تعديل عرض"
        formData={<BrancheForm data={data} type={'update'} />}
      />
    ),
    type:'modal'
  },
  {
    content: "حذف",
    action: "vendor-branchs/id",
    type: "delete",
  },
];

export const BranchesTable: FC<BranchesTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<OfferData[] | undefined>(data?.data);
  return (
    <div className='w-full'>
      <h2 className="text-fontColor text-4xl mb-4 font-semibold">الفروع</h2>
      <SearchField initialData={data?.data} setData={setFilteredData} />
      <div className="overflow-x-auto mt-4">
        <Table className=" rounded-xl shadow-lg">
          <TableHeader className="rounded-xl  ">
            <TableRow className='w-full'>
              <TableHead className="text-right text-fontColor  px-4 py-3 font-semibold" style={{ width: "50px" }} />
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="text-center text-fontColor px-4 py-3 font-semibold"
                  style={{ width: "850px" }}
                >
                  {header}
                </TableHead>
              ))}
              <TableHead
                className="text-right text-fontColor px-4 py-3 font-semibold"
                style={{ width: "50px " }}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filteredData?.map((row, index) => (
                <TableRow key={`row-${index}`} className="even:bg-gray-100 hover:bg-gray-50 bg-white">
                  <TableCell className="font-medium text-right px-4 py-3">
                    <SwitchbBTN is_active={row.is_active} />
                  </TableCell>
                  <TableCell className="font-medium text-right px-4 py-3">
                    {row?.name}
                  </TableCell>
                  <TableCell className="font-medium text-right px-4 py-3">
                    {row?.address}
                  </TableCell>
                 
                  <TableCell className="font-medium text-right px-4 py-3">
                    معلق
                  </TableCell>
               
                  <TableCell className="text-right px-4 py-3">
                    <ActionBtn ActionsList={ActionsList} itemName={row?.name} data={row} />
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
      </div>
    </div>
  );
};
