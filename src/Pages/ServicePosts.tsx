import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServicePostsQuery } from '@/Redux/api';
import { PostsTable } from '@/Components/Tables/PostsTable';
import { PostForm } from '@/Components/Forms/PostForm';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
import { Loader } from '@/Components/Loader/Loader';
export const ServicePosts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServicePostsQuery(serviceId ?? "", {
    skip: !serviceId,
  });
  return (
    <div className="flex flex-wrap gap-2 px-5 justify-center flex-col items-center">
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <Loader />}

      {ServiceOffers && <PostsTable data={ServiceOffers} />}

      <ModalBtn
        text="اضافه منشور "
        formData={<PostForm data={null} type={'post'} />}
      />
    </div>
  );
};