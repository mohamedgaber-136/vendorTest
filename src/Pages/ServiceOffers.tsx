import { OffersForm } from "@/Components/Forms/OfferForm";
import { Loader } from "@/Components/Loader/Loader";
import { ModalBtn } from "@/Components/ModalBtn/ModalBtn";
import { OffersTable } from "@/Components/Tables/OffersTable";
import { useGetServiceOffersQuery } from "@/Redux/api";
import { useOutletContext } from "react-router-dom";

export const ServiceOffers: React.FC = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: ServiceOffers, error: serviceError, isLoading: ServiceLoading } = useGetServiceOffersQuery(serviceId ?? "", {
    skip: !serviceId,
  });
  return (
    <div className="flex flex-wrap flex-col gap-2 px-5 justify-center items-center">

      {serviceError && <p>Error loading service offers.</p>}
      {ServiceLoading && <Loader />}
      {ServiceOffers && <OffersTable data={ServiceOffers} />}
      <ModalBtn
        text="اضافه عرض "
        formData={<OffersForm data={null} type={'post'} />}
        />
    </div>

  );
};
