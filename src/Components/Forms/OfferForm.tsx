import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetCitiesQuery, useGetItemsQuery } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { SelectField } from "../Fields/SelectField";
import { Button } from "../ui/button";
import { FileField } from "../Fields/FileField";
import { DateField } from "../Fields/DateField";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

type ItemService = { id: string; value: boolean; name: string };
type Goverdata = { id: string; name_ar: string; name_en: string; label: string; created_at: any; updated_at: any };

interface InitialValues {
  vendor_offer: boolean;
  vendor_id: any;
  city_id: string;
  title: string;
  service_vendor_id: string;
  sub_service_id: any;
  service_id: string;
  governorate_id: string;
  start_date: string;
  end_date: string;
  description: string;
  image: File[];
  galleryImages: File[];
  price: string;
  old_price: string;
}

export const OffersForm = ({ data }: { data: Partial<InitialValues> }) => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState<string | null>(null);
  const { data: Cities } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: item, isLoading: loading } = useGetItemsQuery("services");
  const { data: govers } = useGetItemsQuery("governorates");
  const { user } = useSelector((state: RootState) => state.auth);
  const serviceData = useSelector((state: RootState) => state.service);
  const vendorId = user ? user.id : null;
  const serviceOptions = item ? item.data.map((service: ItemService) => ({ value: service.id, label: service.name })) : [];
  const goversOption = govers ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name })) : [];
console.log(serviceData)
  const initialValues: InitialValues = {
    vendor_offer: true,
    vendor_id: vendorId,
    city_id: data?.city_id || "",
    title: data?.title || "",
    service_vendor_id: serviceData?.data?.service_id,
    sub_service_id: null,
    service_id: data?.service_id || "",
    governorate_id: data?.governorate_id || "",
    start_date: "2024-10-01",
    end_date: "2024-10-10",
    description: data?.description || "",
    image: data?.image || [],
    galleryImages: data?.galleryImages || [],
    price: data?.price || "",
    old_price: "",
  };

  const validationSchema = Yup.object().shape({
    vendor_offer: Yup.boolean().required(),
    vendor_id: Yup.string().required("Vendor ID is required"),
    city_id: Yup.string().required("City ID is required"),
    title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
    service_vendor_id: Yup.string().required("Service Vendor ID is required"),
    sub_service_id: Yup.string().required("Sub Service ID is required"),
    service_id: Yup.string().required("Service type is required"),
    governorate_id: Yup.string().required("Governorate is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
    description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
    image: Yup.array().min(1 ,"At least 1 images are required").required("Images are required"),
    galleryImages: Yup.array().min(1, "At least 1 gallery images are required").required("Gallery images are required"),
    price: Yup.string().required("Price is required"),
    old_price: Yup.string().required("Old price is required"),
  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      await addItem({ endpoint: "offers", newItem: values }).unwrap();
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
    console.log(values)
  };

  return (
    <Formik initialValues={initialValues}
     validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => (
        loading ? (
          <div className="w-full flex justify-center items-center ">
            <div className="loader"></div>
          </div>
        ) : (
          <Form className="flex flex-col gap-3">
            <TextField formik={formik} item={{ name: 'title', type: 'text', placeHolder: "اسم العرض " }} />
            <SelectField item={{ placeHolder: "نوع الخدمة", name: "service_id", options: serviceOptions }} setCityId={null} />
            <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }} setCityId={setCityId} />
            <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }} setCityId={null} />
            <DateField formik={formik} name="start_date" title="من" />
            <DateField formik={formik} name="end_date" title="الي" />
            <TextField formik={formik} item={{ name: 'description', type: 'textarea', placeHolder: "وصف العرض " }} />
            <div className="flex gap-3">

            <TextField formik={formik} item={{ name: 'price', type: 'text', placeHolder: "السعر الجديد   " }} />
            <TextField formik={formik} item={{ name: 'old_price', type: 'text', placeHolder: "السعر القديم   " }} />
            </div>
            <FileField type="offer_image" formik={formik} endpoint="files" item={{ placeHolder: "اضافة صورة العرض", name: "image" }} />
            <FileField type="offer_gallery_images" formik={formik} endpoint="files" item={{ placeHolder: "ضافة صورة ", name: "galleryImages" }} />
            <Button type="submit" className="w-full sm:w-full bg-primaryColor text-white hover:white">
              اضافه خدمه
              {isLoading && <div className="loader"></div>}
            </Button>
            {isSuccess && <div className="text-green-500">Item added successfully!</div>}
            {isError && <div className="text-red-500">Failed to add item</div>}
          </Form>
        )
      )}
    </Formik>
  );
};
