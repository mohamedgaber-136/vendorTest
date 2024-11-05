import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServiceProductsQuery } from '@/Redux/api';
import { ProductsTable } from '@/Components/Tables/ProductsTable';
export const ServicesProducts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceProductsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div>
      <ProductsTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
    </div>
  );
};