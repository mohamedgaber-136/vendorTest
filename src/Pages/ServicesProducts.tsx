import React from 'react'
import { useOutletContext } from "react-router-dom";
import { useGetServiceProductsQuery } from '@/Redux/api';
import { ProductsTable } from '@/Components/Tables/ProductsTable';
import { ProductForm } from '@/Components/Forms/ProductForm';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
import { Loader } from '@/Components/Loader/Loader';
export const ServicesProducts: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceProductsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div className='flex flex-wrap gap-2 flex-col px-5 justify-center items-center'>
 
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <Loader />}
      {ServiceOffers&&  <div className="w-full">   <ProductsTable data={ServiceOffers} /> </div>}

      <ModalBtn
          text="اضافه منتج "
          formData={<ProductForm data={null} type={'post'} />}
          />
    </div>
  );
};