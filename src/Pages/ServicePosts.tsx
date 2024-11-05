import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServicePostsQuery } from '@/Redux/api';
import { PostsTable } from '@/Components/Tables/PostsTable';
export const ServicePosts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServicePostsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div>
      <PostsTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
    </div>
  );
};