import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServicePostsQuery } from '@/Redux/api';
import { PostsTable } from '@/Components/Tables/PostsTable';
import { PostForm } from '@/Components/Forms/PostForm';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
export const ServicePosts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServicePostsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div className="flex flex-wrap gap-2 px-5 justify-center items-center">
      <PostsTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
      <ModalBtn
          text="اضافه منشور "
          formData={<PostForm data={null} />}
        />
    </div>
  );
};