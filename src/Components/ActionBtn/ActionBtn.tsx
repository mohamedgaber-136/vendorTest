import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '@/Redux/ServiceSlice';
import React from 'react';
import { useDeleteItemMutation } from '@/Redux/api';

interface Action {
  action: string | ((itemName: string) => void);
  content: React.ReactNode;
  type: 'navigat' | 'modal' | 'delete'; // define expected types for `type`
}

interface ActionBtnProps {
  ActionsList: Action[];
  itemName: string;
  data: { id: string }; // Adjusted type to expect an object with an `id` property
}

export const ActionBtn: React.FC<ActionBtnProps> = ({ ActionsList, itemName, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteItem, { isLoading, isError, isSuccess }] = useDeleteItemMutation();
  const handleMenuItemClick = async (type: Action['type'], action: Action['action']) => {
    switch (type) {
      case 'navigat':
        if (typeof action === 'string') {
          const path = action.replace(":ServiceName", itemName); // Replace :ServiceName with actual item name for navigation
          dispatch(setData({ data }));
          navigate(path);
        }
        break;
      case 'modal':
        console.log('modal');
        break;
      case 'delete':
        if (typeof action === 'string') {
          const endpoint = action.replace("id", data.id); // Replace placeholder with actual id
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
          <DropdownMenuItem
            key={index}
            className="flex justify-center cursor-pointer"
            onClick={() => handleMenuItemClick(item.type, item.action)}
          >
            {item.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
