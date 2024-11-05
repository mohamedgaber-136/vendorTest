import { AdsTable } from "@/Components/Tables/AdsTable";
import { useGetServiceAdsQuery } from "@/Redux/api";
import { useOutletContext } from "react-router-dom";
export const ServiceAds = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceAdsQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  return (
    <div>
      <AdsTable data={ServiceOffers} />
      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <p className="text-center">Loading...</p>}
    </div>
  );
}
