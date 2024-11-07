import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetCitiesQuery, useGetItemsQuery, useGetSingleServiceQuery } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { RadioField } from "../Fields/RadioField";
import { SelectField } from "../Fields/SelectField";
import { Button } from "../ui/button";
import { FileField } from "../Fields/FileField";
import { useDispatch } from "react-redux";
import { setData } from "@/Redux/ServiceSlice";

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

export const ServiceForm = ({ data, type }) => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState(1);
  const { data: Cities } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: item, isLoading: loading } = useGetItemsQuery("services?limit=1000");
  const { data: govers } = useGetItemsQuery("governorates?limit=1000");
  const dispatch = useDispatch();

  const serviceOptions = item ? item.data.map((service: ItemService) => ({ value: service.id, label: service.name })) : [];
  const goversOption = govers ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name })) : [];
  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    switch (type) {
      case 'post':
        try {
          await addItem({ endpoint: "service-vendors", newItem: values }).unwrap();
          console.log("Item added successfully");
        } catch (error) {
          console.error("Failed to add item:", error);
        } finally {
          setSubmitting(false);
        }
        break;
      case 'update':
        try {
          await addItem({ endpoint: `service-vendors/${data?.service_id}?_method=PUT`, newItem: values }).unwrap();
          console.log("Item added successfully");
          dispatch(setData({ values }));
        } catch (error) {
          console.error("Failed to add item:", error);
        } finally {
          setSubmitting(false);
        }
        break;
    }
  };


  const initialValues: InitialValues = {
    commercial_name: data?.commercial_name || "",
    service_id: data?.service_id || "",
    governorate_id: data?.governorate_id || 1,
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
console.log(data )
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
    images: Yup.array().min(data?.images?.length ? 0 : 4, "يجب أن تحتوي الصور على 4 صور على الأقل").required("الصور مطلوبة"),
    cover: Yup.array().min(data?.images?.length ? 0 : 4, "يجب أن يحتوي الغلاف على 4 صور على الأقل").required("الغلاف مطلوب"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        loading ? <div className="w-full flex justify-center items-center ">
          <div className="loader"></div>
        </div> : <Form className="flex flex-col gap-3">

          <TextField formik={formik} item={{ name: 'commercial_name', type: 'text', placeHolder: "الاسم التجاري" }} />
          <RadioField formik={formik} item={{ name: "vendor_type", placeHolder: 'هل أنت', options: [{ label: "فرد", value: "1" }, { label: "شركة", value: "2" }] }} />
          <SelectField item={{ placeHolder: "نوع الخدمة", name: "service_id", options: serviceOptions }} setCityId={null} />
          <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }} setCityId={setCityId} />
          <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }} setCityId={null} />
          <TextField formik={formik} item={{ name: 'mobile', type: 'text', placeHolder: "الموبيل   " }} />
          <TextField formik={formik} item={{ name: 'whatsapp', type: 'text', placeHolder: "رقم واتس اب   " }} />
          <TextField formik={formik} item={{ name: 'description', type: 'textarea', placeHolder: "وصف الخدمة " }} />
          <TextField formik={formik} item={{ name: 'price', type: 'text', placeHolder: "السعر   " }} />
          <FileField type='service_vendor_images' formik={formik} endpoint="files" item={{ placeHolder: "اضافة صورة الخدمة", name: "images" }} />
          <div className="flex gap-3">


            {data?.images?.length ? data?.images?.map((item) => <img
              src={item.url}
              key={item.urm}
              alt={`Preview ${item.url + 1}`}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />) : ''}
          </div>
          <FileField type='main_service_cover' formik={formik} endpoint="files" item={{ placeHolder: "اضافة صورة الغلاف", name: "cover" }} />
          <Button type="submit" className={`w-full sm:w-full bg-primaryColor text-white hover:white`}>
            {data?.mobile ? "تعديل" : 'اضافه خدمه'}
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
