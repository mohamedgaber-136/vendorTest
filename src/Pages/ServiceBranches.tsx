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
    <div>
      <BranchesTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
    </div>
  );
}
