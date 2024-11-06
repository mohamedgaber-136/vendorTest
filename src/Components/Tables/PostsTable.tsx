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
  post_content: string;
  images: { url: string }[];
  view_count: number;
  like_count: number;
  share_count: number;
}

interface Action {
  content: string;
  action: string;
  type: string;
}

interface OffersTableProps {
  data?: {
    data: OfferData[];
  };
}

const headers: string[] = [
  "صوره",
  "محتوي",
  "الحاله",
  "المشاهدات",
  "الاعجاب",
  "المشاركه",
];

const ActionsList: Action[] = [
  {
    content: 'عرض',
    action: "/Services/:ServiceName",
    type: 'navigate',
  },
  {
    content: 'تعديل',
    type: "modal",
    action: '/Services/:ServiceName',
  },
  {
    content: "حذف",
    action: "posts/id",
    type: "delete",
  },
];

export const PostsTable: FC<OffersTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<OfferData[] | undefined>(data?.data);

  return (
    <>
      <h2 className='text-fontColor text-4xl mb-4 font-semibold'>منشورات</h2>
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
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  <img className='rounded' src={row.images[0]?.url} alt="postImg" style={{ width: '80px', objectFit: "cover" }} />
                </TableCell>
                <TableCell className="font-medium text-right py-5 gap-3" style={{ width: "150px" }}>
                  {row.post_content}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  <button
                    className={`${row.is_active ? "bg-green-800" : "bg-red-800"} px-4 py-2 border border-gray-400 text-white rounded-lg`}
                  >
                    {row.is_active ? "نشط" : "معلق"}
                  </button>
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.view_count}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.like_count}
                </TableCell>
                <TableCell className="font-medium text-right py-5" style={{ width: "150px" }}>
                  {row.share_count}
                </TableCell>
                <TableCell className="text-right" style={{ width: "50px" }}>
                  <ActionBtn ActionsList={ActionsList} itemName={row.post_content} data={row} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length + 1} className="text-center p-5">
                No Data Yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
