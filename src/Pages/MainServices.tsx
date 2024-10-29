import { Loader } from "@/Components/Loader/Loader";
import { ModalBtn } from "@/Components/ModalBtn/ModalBtn";
import { Services } from "@/Components/Services/Services";
import { useGetItemsQuery, useGetVendorServicesQuery } from "@/Redux/api";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const MainServices = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: vendorServices, error: vendorError, isLoading: vendorLoading } = useGetVendorServicesQuery(user.id); // use actual vendorId if dynamic
  const { data: item, error: itemError, isLoading: itemLoading } = useGetItemsQuery('services');

  // Extract options from item.data if it exists
  const serviceOptions = item?.data ? item.data.map(service => ({
    value: service.id, // Assuming each service has an 'id' field
    label: service.name, // Assuming each service has a 'name' field
  })) : [];

  const Fields = [
    {
      type: "text",
      placeHolder: "الاسم التجاري",
      name: "commercial_name",
    },
    {
      type: "select",
      placeHolder: "نوع الخدمة",
      name: "service_id",
      options: serviceOptions, // Set options here
    },
    {
      type: "text",
      placeHolder: "المحافظة",
      name: "province",
    },
    {
      type: "text",
      placeHolder: "المدينة",
      name: "city_id",
    },
    {
      type: "text",
      placeHolder: "رقم الهاتف",
      name: "mobile",
    },
    {
      type: "text",
      placeHolder: "رقم تواصل واتس اب",
      name: "whatsapp",
    },
    {
      type: "textarea",
      placeHolder: "وصف الخدمة",
      name: "description",
    },
    {
      type: "file",
      placeHolder: "اضافة صورة الخدمة",
      name: "images",
    },
    {
      type: "file",
      placeHolder: "اضافة صورة الغلاف",
      name: "cover",
    },
    {
      type: "text",
      placeHolder: " السعر تبدا من ",
      name: "price",
    },
    {
      type: "radio",
      label: " هل أنت",
      name: "vendor_type",
      options: [{
        label: "فرد",
        value: "1"
      }, {
        label: "شركة",
        value: "2"
      }],
    },
  ];

  // Set up initial values for each field
  const initialValues = {
    commercial_name: "",
    service_id: "",
    province: "",
    city_id: "",
    mobile: "",
    whatsapp: "",
    description: "",
    images: null,
    cover: null,
    price: "", // initially empty, user chooses one option
    vendor_type: "",
    price_type:"1" // initially empty, user chooses one option
  };

  // Create validation schema using Yup
  const validationSchema = Yup.object({
    commercial_name: Yup.string()
      .min(3, "يجب أن يحتوي الاسم التجاري على 3 أحرف على الأقل")
      .required("الاسم التجاري مطلوب"),
    service_id: Yup.string().required("نوع الخدمة مطلوب"),
    province: Yup.string().required("المحافظة مطلوبة"),
    city_id: Yup.string().required("المدينة مطلوبة"),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
      .min(10, "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل")
      .required("رقم الهاتف مطلوب"),
    whatsapp: Yup.string()
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الواتس اب على أرقام فقط")
      .min(10, "يجب أن يحتوي رقم الواتس اب على 10 أرقام على الأقل")
      .required("رقم تواصل واتس اب مطلوب"),
    description: Yup.string()
      .min(10, "يجب أن يحتوي الوصف على 10 أحرف على الأقل")
      .required("وصف الخدمة مطلوب"),
    price: Yup.string().required(" السعر مطلوب"),
    vendor_type: Yup.string()
      .oneOf(["2", "1"], "يرجى اختيار نوع المنشأ")
      .required("نوع المنشأ مطلوب"),
  });

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {/* Display All Services */}
      {(vendorLoading || itemLoading) && <Loader />}
      {(vendorError || itemError) && <p>Failed to load services</p>}
      {vendorServices &&
        vendorServices.data.map((service: any, index: number) => (
          <Services key={index} data={service} />
        ))}
      {/* Btn For Modal  */}
      <ModalBtn
        text={"اضافه خدمه رئيسيه"}
        Fields={Fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fieldWidth={true}
      />
    </div>
  );
};
