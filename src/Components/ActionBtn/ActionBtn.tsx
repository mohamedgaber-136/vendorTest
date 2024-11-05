import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '@/Redux/ServiceSlice';

interface Action {
  action: string | ((itemName: string) => void);
  content: React.ReactNode;
}

interface ActionBtnProps {
  ActionsList: Action[];
  itemName: string;
  data: string; // Adjust type based on what `data` is expected to be
}

export const ActionBtn: React.FC<ActionBtnProps> = ({ ActionsList, itemName, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleMenuItemClick = (action: string | ((itemName: string) => void)) => {
    console.log(action, 'action');
    if (typeof action === 'function') {
      action(itemName); // Execute if action is a function (like swal alert)
    } else if (typeof action === 'string' && action) {
      const path = action.replace(":ServiceName", itemName); // Replace :ServiceName with actual item name for navigation
      navigate(path);
      dispatch(setData({
        data: data,

      }));
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
            onClick={() => handleMenuItemClick(item.action)}
          >
            {item.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
