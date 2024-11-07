import { useSelector } from "react-redux";
import { useGetVendorServicesQuery } from "../Redux/api";
import { Loader } from "../Components/Loader/Loader";
import { ModalBtn } from "../Components/ModalBtn/ModalBtn";
import { RootState } from "../Redux/Store";
import { MainServicesTable } from "@/Components/Tables/MainServicesTable";
import { ServiceForm } from "@/Components/Forms/ServiceForm";
export const MainServices: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const vendorId = user ? user.id : null;
  const { data: vendorServices, error: vendorError, isLoading: vendorLoading } = useGetVendorServicesQuery(vendorId ?? "", { skip: !vendorId });
  return (
    <div className="flex flex-wrap gap-2 px-5 justify-center items-center">
      {(vendorLoading) && <Loader />}
      {(vendorError) && <p>فشل في تحميل الخدمات</p>}
      {vendorServices && <MainServicesTable data={vendorServices} />}
      <ModalBtn
        text="اضافه خدمه رئيسيه"
        formData={<ServiceForm data={null} type={'post'} />}
      />
    </div>
  );
};
