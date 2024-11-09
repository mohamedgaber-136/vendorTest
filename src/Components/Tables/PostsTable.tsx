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
import { PostForm } from '../Forms/PostForm';

interface PostData {
  id: string;
  is_active: boolean;
  post_content: string;
  images: { url: string }[];
  view_count: number;
  like_count: number;
  share_count: number;
}

interface Action {
  content: string;
  action: any;
  type: 'navigat' | 'modal' | 'delete';
}

interface PostsTableProps {
  data?: {
    data: PostData[];
  };
}

const headers = [
  "صوره",
  "محتوي",
  "الحاله",
  "المشاهدات",
  "الاعجاب",
  "المشاركه",
];

const ActionsList: Action[] = [
  {
    content: 'تعديل',
    type: "modal",
    action: (data: { id: string }) => (
      <EditBtn
        text="تعديل منشور"
        formData={<PostForm data={data} type={'update'} />}
      />
    ),
  },
  {
    content: "حذف",
    action: "posts/id",
    type: "delete",
  },
];

export const PostsTable: FC<PostsTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<PostData[] | undefined>(data?.data);

  return (
    <div className='w-full'>
      <h2 className='text-fontColor text-4xl mb-4 font-semibold'>منشورات</h2>
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
                  style={{ width: "250px" }}
                
                >
                  {header}
                </TableHead>
              ))}
              <TableHead className="text-right text-fontColor px-3 font-semibold" style={{ width: "50px" }} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData && filteredData.length ? (
              filteredData.map((row, index) => (
                <TableRow key={`row-${index}`} className="even:bg-gray-100">
                  <TableCell className="font-medium text-right gap-3" style={{ width: "50px" }} dir="ltr">
                  <SwitchbBTN is_active={row.is_active} />
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
      </div>
    </div>
  );
};
