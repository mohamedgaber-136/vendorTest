import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { MoreVertical } from "lucide-react";

interface SingleNotificationProps {
  avatarUrl: string;
  name: string;
  date: string;
}

export const SingleNotification: React.FC<SingleNotificationProps> = ({ avatarUrl, name, date }) => {
  return (
    <div className="border rounded-2xl w-full">
      <div className="items-center flex rounded-lg">
        <div className="content items-center gap-4 p-2 w-full flex">
          <Avatar>
            <AvatarImage src={avatarUrl} width="50px" />
          </Avatar>
          <div className="dataContent">
            <div className="name">
              <small>{name}</small>
            </div>
            <div className="birthDate">{date}</div>
          </div>
        </div>
        <MoreVertical />
      </div>
    </div>
  );
};
