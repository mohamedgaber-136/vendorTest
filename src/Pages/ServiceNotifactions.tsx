import { Loader } from "@/Components/Loader/Loader";
import { SingleNotification } from "@/Components/SingleNotification/SingleNotification";
import { useGetItemsQuery } from "@/Redux/api";

interface Notification {
  id: string;
  fromUser: {
    avatar: string;
    name: string;
  };
  date: string;
}

export const ServiceNotifications: React.FC = () => {
  const { data: notifications, isLoading: loading } = useGetItemsQuery<Notification[]>(`notifications?embed=fromUser.avatar`);

  return (
    <div className="flex flex-wrap flex-col gap-2 px-5 justify-center items-center">
      {loading && <Loader />}
      {notifications&&
        notifications?.data?.map((item) => (
          <SingleNotification
            key={item.id}
            date={item.date}
            name={item.fromUser.name}
            avatarUrl={item.fromUser.avatar}
          />
        ))}
        <SingleNotification 
  avatarUrl="https://github.com/shadcn.png" 
  name="John Doe" 
  date="01/01/2023" 
/>

    </div>
  );
};