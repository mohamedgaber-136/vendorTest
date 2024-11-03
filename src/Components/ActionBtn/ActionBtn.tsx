import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom';

export const ActionBtn = ({ ActionsList, itemName }) => {
    const navigate = useNavigate()
    const handleMenuItemClick = (action) => {
        if (typeof action === 'function') {
            action(itemName); // Execute if action is a function (like swal alert)
        } else if (typeof action === 'string' && action) {
            const path = action.replace(":ServiceName", itemName); // Replace :Id with actual id for navigation
            navigate(path);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical className="w-5 h-5 text-gray-600 bg-transparent cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {ActionsList.map((item) => <DropdownMenuItem className=' flex justify-center cursor-pointer' onClick={() => handleMenuItemClick(item.action)}
                >{item.content}</DropdownMenuItem>
                )}


            </DropdownMenuContent>
        </DropdownMenu>)
}
