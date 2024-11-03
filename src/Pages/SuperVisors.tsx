import { useSelector } from "react-redux";
import { useGetVendorServicesQuery } from "../Redux/api";
import { Loader } from "../Components/Loader/Loader";
import { RootState } from "../Redux/Store";
import { MainServicesTable } from "@/Components/Tables/MainServicesTable";
export const SuperVisors = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const vendorId = user ? user.id : null;
  const { data: vendorServices, error: vendorError, isLoading: vendorLoading } = useGetVendorServicesQuery(vendorId ?? "", { skip: !vendorId });
  return (
    <div className="px-5">
 {(vendorLoading) && <Loader />}
      {(vendorError) && <p>فشل في تحميل الخدمات</p>}
      {vendorServices && <MainServicesTable data={vendorServices} />}    </div>
  );
};
