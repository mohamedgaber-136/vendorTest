import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetCitiesQuery, useGetItemsQuery } from "../../Redux/api";
import { Loader } from "../Loader/Loader";
import { TextField } from "../Fields/TextField";
import { RadioField } from "../Fields/RadioField";
import { SelectField } from "../Fields/SelectField";
import { Button } from "../ui/button";
import { FileField } from "../Fields/FileField";

type ItemService = { id: string; value: boolean; name: string; };
type Goverdata = { id: string; name_ar: string; name_en: string; label: string; created_at: any; updated_at: any; };

interface InitialValues {
  commercial_name: string;
  service_id: string;
  governorate_id: string;
  city_id: string;
  mobile: string;
  whatsapp: string;
  description: string;
  images: File[];
  cover: File[];
  price: string;
  vendor_type: string;
  price_type: string;
}

export const ServiceForm = () => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState<string | null>(null);
  const { data: Cities } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: item,   } = useGetItemsQuery("services");
  const { data: govers } = useGetItemsQuery("governorates");

  const serviceOptions = item ? item.data.map((service: ItemService) => ({ value: service.id, label: service.name })) : [];
  const goversOption = govers ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name })) : [];
  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    // try {
    //   const newItem = { ...values };
    //   await addItem({ endpoint: "yourEndpoint", newItem }).unwrap();
    //   console.log("Item added successfully");
    // } catch (error) {
    //   console.error("Failed to add item:", error);
    // } finally {
    //   setSubmitting(false);
    // }
    console.log(values)
  };

  const initialValues: InitialValues = {
    commercial_name: "",
    service_id: "",
    governorate_id: "",
    city_id: "",
    mobile: "",
    whatsapp: "",
    description: "",
    images: [],
    cover: [],
    price: "",
    vendor_type: "",
    price_type: "1",
  };

  const validationSchema = Yup.object().shape({
    commercial_name: Yup.string().min(3, "يجب أن يحتوي الاسم التجاري على 3 أحرف على الأقل").required("الاسم التجاري مطلوب"),
    service_id: Yup.string().required("نوع الخدمة مطلوب"),
    governorate_id: Yup.string().required("المحافظة مطلوبة"),
    city_id: Yup.string().required("المدينة مطلوبة"),
    mobile: Yup.string().matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط").min(10, "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل").required("رقم الهاتف مطلوب"),
    whatsapp: Yup.string().matches(/^[0-9]+$/, "يجب أن يحتوي رقم الواتس اب على أرقام فقط").min(10, "يجب أن يحتوي رقم الواتس اب على 10 أرقام على الأقل").required("رقم تواصل واتس اب مطلوب"),
    description: Yup.string().min(10, "يجب أن يحتوي الوصف على 10 أحرف على الأقل").required("وصف الخدمة مطلوب"),
    price: Yup.string().required(" السعر مطلوب"),
    vendor_type: Yup.string().oneOf(["2", "1"], "يرجى اختيار نوع المنشأ").required("نوع المنشأ مطلوب"),
  });

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col gap-3">
          <TextField formik={formik} item={{ name: 'commercial_name', type: 'text', placeHolder: "الاسم التجاري" }} />
          <RadioField item={{ name: "vendor_type", options: [{ label: "فرد", value: "1" }, { label: "شركة", value: "2" }] }} />
          <SelectField item={{ placeHolder: "نوع الخدمة", name: "service_id", options: serviceOptions }}   setCityId={null} />
          <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }}  setCityId={setCityId}/>
          <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }}  setCityId={null} />
          <TextField formik={formik} item={{ name: 'mobile', type: 'text', placeHolder: "الموبيل   " }} />
          <TextField formik={formik} item={{ name: 'whatsapp', type: 'text', placeHolder: "رقم واتس اب   " }} />
          <TextField formik={formik} item={{ name: 'description', type: 'textarea', placeHolder: "وصف الخدمه " }} />
          <TextField formik={formik} item={{ name: 'price', type: 'text', placeHolder: "السعر   " }} />
          <FileField formik={formik} item={{placeHolder: "اضافة صورة الخدمة", name: "image" }}/>
          <FileField formik={formik} item={{placeHolder: "اضافة صورة الغلاف", name: "covers"  }}/>
          <Button type="submit" className={`w-full sm:w-full bg-primaryColor text-white hover:white`}>
            اضافه خدمه
          </Button>
          {isLoading && <Loader />}
          {isSuccess && <div className="text-green-500">Item added successfully!</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>
      )}
    </Formik>
  );
};
