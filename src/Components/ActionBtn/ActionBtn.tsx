import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '@/Redux/ServiceSlice';
import React from 'react';
import { useDeleteItemMutation } from '@/Redux/api';

interface Action {
  action: string | ((data: { id: string }) => JSX.Element);
  content: React.ReactNode;
  type: 'navigat' | 'modal' | 'delete';
}

interface ActionBtnProps {
  ActionsList: any;
  itemName: string;
  data: { id: string };
}

export const ActionBtn: React.FC<ActionBtnProps> = ({ ActionsList, itemName, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteItem] = useDeleteItemMutation();
  const handleMenuItemClick = async (type: Action['type'], action: Action['action']) => {
    switch (type) {
      case 'navigat':
        if (typeof action === 'string') {
          const path = action.replace(":ServiceName", itemName);
          dispatch(setData({ data }));
          navigate(path);
        }
        break;
      case 'delete':
        if (typeof action === 'string') {
          const endpoint = action.replace("id", data.id);
          await deleteItem({ endpoint }).unwrap();
        }
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="w-5 h-5 text-gray-600 bg-transparent cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {ActionsList.map((item, index) => (
          item.type === 'modal' && typeof item.action === 'function' ? (
            <React.Fragment key={index}>
              {item.action(data)}
            </React.Fragment>
          ) : (
            <DropdownMenuItem
              key={index}
              className="flex justify-center cursor-pointer text-black font-semibold"
              onClick={() => handleMenuItemClick(item.type, item.action)}
            >
              {item.content}
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
