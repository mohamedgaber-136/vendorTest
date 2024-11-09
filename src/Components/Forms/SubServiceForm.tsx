import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetCitiesQuery, useGetItemsQuery } from "../../Redux/api";
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

export const SubServiceForm = ({ data }) => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState<string | null>(null);
  const { data: Cities } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: item, isLoading: loading } = useGetItemsQuery("services");
  const { data: govers } = useGetItemsQuery("governorates");

  const serviceOptions = item ? item.data.map((service: ItemService) => ({ value: service.id, label: service.name })) : [];
  const goversOption = govers ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name })) : [];
  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      await addItem({ endpoint: "service-vendors", newItem: values }).unwrap();
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: InitialValues = {
    commercial_name: data?.commercial_name || "",
    service_id: data?.service_id || "",
    governorate_id: data?.governorate_id || "",
    city_id: data?.city_id || "",
    mobile: data?.mobile || "",
    whatsapp: data?.whatsapp || "",
    description: data?.description || "",
    images: data?.images || [],
    cover: data?.covers || [],
    price: data?.price || "",
    vendor_type: data?.vendor_type || "",
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
    images: Yup.array().min(4, "يجب أن تحتوي الصور على 4 صور على الأقل").required("الصور مطلوبة"),
    cover: Yup.array().min(4, "يجب أن يحتوي الغلاف على 4 صور على الأقل").required("الغلاف مطلوب"),
  });

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        loading ? <div className="w-full flex justify-center items-center ">
          <div className="loader"></div>
        </div> : <Form className="flex flex-col gap-3">

          <SelectField item={{ placeHolder: "نوع الخدمة", name: "service_id", options: serviceOptions }} setCityId={null} />
          <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }} setCityId={setCityId} />
          <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }} setCityId={null} />
          <TextField formik={formik} item={{ name: 'description', type: 'textarea', placeHolder: "وصف العرض " }} />
          <TextField formik={formik} item={{ name: 'price', type: 'text', placeHolder: "السعر   " }} />
          <FileField formik={formik} item={{ placeHolder: "اضافة صورة ", name: "images" }} />
          <Button type="submit" className={`w-full sm:w-full bg-primaryColor text-white hover:white`}>
             نشر
            {isLoading && <div className="loader"></div>
            }
          </Button>
          {isSuccess && <div className="text-green-500">Item added successfully!</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>

      )}
    </Formik>
  );
};
