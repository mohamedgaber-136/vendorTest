import { ModalBtn } from "@/Components/ModalBtn/ModalBtn";
import { Services } from "@/Components/Services/Services";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const MainServices = () => {
  const {user} = useSelector((state: RootState)=>state.auth)
  console.log(user,'user')
  // Example For Vendor Services
  const ServicesData = [
    {
      name: "ايجار القاعه",
      active: true,
    },
    {
      name: "ايجار سياره",
      active: false,
    },
    {
      name: "تصوير ",
      active: true,
    },
  ];
  const Fields = [
    {
      type: "text",
      placeHolder: "الاسم التجاري",
      name: "businessName",
    },
    {
      type: "text",
      placeHolder: "نوع الخدمة",
      name: "serviceType",
    },
    {
      type: "text",
      placeHolder: "المحافظة",
      name: "province",
    },
    {
      type: "text",
      placeHolder: "المدينة",
      name: "city",
    },
    {
      type: "text",
      placeHolder: "رقم الهاتف",
      name: "phone",
    },
    {
      type: "text",
      placeHolder: "رقم تواصل واتس اب",
      name: "whatsapp",
    },
    {
      type: "textarea",
      placeHolder: "وصف الخدمة",
      name: "serviceDescription",
    },
    {
      type: "file",
      placeHolder: "اضافة صورة الخدمة",
      name: "serviceImage",
    },
    {
      type: "file",
      placeHolder: "اضافة صورة الغلاف",
      name: "coverImage",
    },
    // {
    //   type: "radio",
    //   label: "تكلفة الخدمة",
    //   name: "serviceCostType",
    //   options: ["السعر ثابت", "السعر غير ثابت"],
    // },
    {
      type: "radio",
      label: " هل أنت",
      name: "entityType",
      options: ["فرد", "شركة"],
    },
  ];

  // Set up initial values for each field
  const initialValues = {
    businessName: "",
    serviceType: "",
    province: "",
    city: "",
    phone: "",
    whatsapp: "",
    serviceDescription: "",
    serviceImage: null,
    coverImage: null,
    serviceCostType: "", // initially empty, user chooses one option
    entityType: "", // initially empty, user chooses one option
  };

  // Create validation schema using Yup
  const validationSchema = Yup.object({
    businessName: Yup.string()
      .min(3, "يجب أن يحتوي الاسم التجاري على 3 أحرف على الأقل")
      .required("الاسم التجاري مطلوب"),
    serviceType: Yup.string().required("نوع الخدمة مطلوب"),
    province: Yup.string().required("المحافظة مطلوبة"),
    city: Yup.string().required("المدينة مطلوبة"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
      .min(10, "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل")
      .required("رقم الهاتف مطلوب"),
    whatsapp: Yup.string()
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الواتس اب على أرقام فقط")
      .min(10, "يجب أن يحتوي رقم الواتس اب على 10 أرقام على الأقل")
      .required("رقم تواصل واتس اب مطلوب"),
    serviceDescription: Yup.string()
      .min(10, "يجب أن يحتوي الوصف على 10 أحرف على الأقل")
      .required("وصف الخدمة مطلوب"),
    serviceImage: Yup.mixed()
      .required("إضافة صورة الخدمة مطلوب")
      .test("fileType", "الملف يجب أن يكون صورة", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : true
      ),
    coverImage: Yup.mixed()
      .required("إضافة صورة الغلاف مطلوب")
      .test("fileType", "الملف يجب أن يكون صورة", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : true
      ),
    serviceCostType: Yup.string()
      .oneOf(["السعر ثابت", "السعر غير ثابت"], "يرجى اختيار تكلفة الخدمة")
      .required("تكلفة الخدمة مطلوبة"),
    entityType: Yup.string()
      .oneOf(["فرد", "شركة"], "يرجى اختيار نوع المنشأ")
      .required("نوع المنشأ مطلوب"),
  });

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {/* Display All Services  */}
      {ServicesData.map((item, index) => (
        <Services key={index} data={item} />
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
