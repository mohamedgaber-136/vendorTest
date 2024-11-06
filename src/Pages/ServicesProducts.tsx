import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServiceProductsQuery } from '@/Redux/api';
import { ProductsTable } from '@/Components/Tables/ProductsTable';
import { ProductForm } from '@/Components/Forms/ProductForm';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
export const ServicesProducts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceProductsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div className='flex flex-wrap gap-2 px-5 justify-center items-center'>
      <ProductsTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
      <ModalBtn
          text="اضافه منتج "
          formData={<ProductForm data={null} />}
        />
    </div>
  );
};