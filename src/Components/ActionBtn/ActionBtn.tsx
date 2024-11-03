import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

export const ActionBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>           
             <MoreVertical className="w-5 h-5 text-gray-600 bg-transparent cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className=' flex justify-center cursor-pointer'>عرض</DropdownMenuItem>
                <DropdownMenuItem className=' flex justify-center cursor-pointer'>تعديل</DropdownMenuItem>
                <DropdownMenuItem className=' flex justify-center cursor-pointer'>حذف</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}
