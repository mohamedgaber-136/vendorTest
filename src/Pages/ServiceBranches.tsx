import { BrancheForm } from '@/Components/Forms/BrancheForm';
import { Loader } from '@/Components/Loader/Loader';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
import { BranchesTable } from '@/Components/Tables/BranchesTable';
import { useGetServiceBranchesQuery } from '@/Redux/api';
import React from 'react'
import { useOutletContext } from 'react-router-dom';

export const ServiceBranches = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceBranchesQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div  className="flex flex-wrap flex-col gap-2 px-5 justify-center items-center" >


      {ServiceLoading && <Loader />}
      {serviceError && <p>Error loading service offers.</p>}
      {
        ServiceOffers && <BranchesTable data={ServiceOffers} />
      }
      <div className="flex flex-wrap gap-2  my-5 px-5 justify-center items-center">

        <ModalBtn
          text="اضافه فرع "
          formData={<BrancheForm data={null} type='post' />}
        />
      </div>
    </div>
  );
}
