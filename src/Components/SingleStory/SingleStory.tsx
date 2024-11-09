import { useDeleteItemMutation } from "@/Redux/api";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

// Define the type for item prop
interface StoryItem {
  id: string;
  file: {
    url: string;
  };
}

interface SingleStoryProps {
  item: StoryItem;
}

export const SingleStory: React.FC<SingleStoryProps> = ({ item }) => {
  const [deleteItem] = useDeleteItemMutation();

  const deleteStory = async (id: string) => {
    const endpoint = `stories/${id}`;
    try {
      await deleteItem({ endpoint }).unwrap();
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  return (
    <div className="StoryParent">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="storyAcition" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex justify-center">
            <div onClick={() => deleteStory(item.id)} className="text-black font-semibold text-center cursor-pointer">
              مسح
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <img src={item?.file?.url} alt="Story Image" />
    </div>
  );
};
