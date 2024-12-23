import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetCitiesQuery, useGetItemsQuery } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { SelectField } from "../Fields/SelectField";
import { Button } from "../ui/button";
import { FileField } from "../Fields/FileField";
import { DateField } from "../Fields/DateField";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { combineSlices } from "@reduxjs/toolkit";

type Goverdata = { id: string; name_ar: string; name_en: string; label: string; created_at: any; updated_at: any };

interface InitialValues {
  vendor_offer: boolean;
  vendor_id: string | null;
  city_id: string;
  title: string;
  service_vendor_id: string;
  sub_service_id: string;
  governorate_id: string;
  start_date: string;
  end_date: string;
  description: string;
  image: File[];
  galleryImages: File[];
  price: string;
  old_price: string;
}

interface OffersFormProps {
  data: Partial<InitialValues>;
  type: "post" | "update";
}

export const OffersForm: React.FC<OffersFormProps> = ({ data, type }) => {
  const serviceData = useSelector((state: RootState) => state.service);
  const { user } = useSelector((state: RootState) => state.auth);
  const vendorId = user ? user.id : null;
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState<string | null>(null);
  const { data: Cities } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: govers } = useGetItemsQuery("governorates?limit=1000");
  const { data: subservices, isLoading: loading } = useGetItemsQuery(`sub-services?ParentId=${serviceData?.data?.service_id}&limit=1000`);

  const goversOption = govers
    ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name_ar }))
    : [];

  const initialValues: InitialValues = {
    vendor_offer: true,
    vendor_id: vendorId,
    city_id: data?.city_id || "",
    title: data?.title || "",
    service_vendor_id: serviceData?.data?.id || "",
    sub_service_id: data?.sub_service_id || "40",
    governorate_id: data?.governorate_id || "",
    start_date: data?.start_date || "2024-10-01",
    end_date: data?.end_date || "2024-10-10",
    description: data?.description || "",
    image: data?.image || [],
    galleryImages: data?.galleryImages || [],
    price: data?.price || "",
    old_price: data?.old_price || "",
  };

  const validationSchema = Yup.object().shape({
    vendor_offer: Yup.boolean().required(),
    vendor_id: Yup.string().required("Vendor ID is required"),
    city_id: Yup.string().required("City ID is required"),
    title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
    service_vendor_id: Yup.string().required("Service Vendor ID is required"),
    sub_service_id: Yup.string().required("Sub Service ID is required"),
    governorate_id: Yup.string().required("Governorate is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
    description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
    image: Yup.array().min(1, "At least 1 image is required").required("Images are required"),
    galleryImages: Yup.array().min(1, "At least 1 gallery image is required").required("Gallery images are required"),
    price: Yup.string().max(6, "Maximum 6 numbers").required("Price is required"),
    old_price: Yup.string().max(6, "Maximum 6 numbers").required("Old price is required"),
  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      if (type === "post") {
        await addItem({ endpoint: "offers", newItem: values }).unwrap();
      } else if (type === "update") {
        await addItem({ endpoint: `offers/${data?.id}?_method=PUT`, newItem: values }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (data?.governorate_id) {
      setCityId(data?.governorate_id);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
    
          <Form className="flex flex-col gap-3">
            <TextField formik={formik} item={{ name: "title", type: "text", placeHolder: "اسم العرض " }} />
            <SelectField item={{ placeHolder: "الخدمه الفرعيه ", name: "sub_service_id", options: subservices?.data ?? [] }} setCityId={null} />
            <div className="flex gap-3">
              <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }} setCityId={setCityId} />
              <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }} setCityId={null} />
            </div>
            <DateField formik={formik} name="start_date" title="من" />
            <DateField formik={formik} name="end_date" title="الي" />
            <TextField formik={formik} item={{ name: "description", type: "textarea", placeHolder: "وصف العرض " }} />
            <div className="flex gap-3">
              <TextField formik={formik} item={{ name: "price", type: "text", placeHolder: "السعر الجديد   " }} />
              <TextField formik={formik} item={{ name: "old_price", type: "text", placeHolder: "السعر القديم   " }} />
            </div>
            <FileField type="offer_image" formik={formik} endpoint="files" item={{ placeHolder: "اضافة صورة العرض", name: "image" }} />
            <FileField type="offer_gallery_images" formik={formik} endpoint="files" item={{ placeHolder: "ضافة صورة ", name: "galleryImages" }} />
            <Button type="submit" className="w-full sm:w-full bg-primaryColor text-white hover:white">
              {data ? "تعديل" : "اضافه"} عرض
              {isLoading && <div className="loader"></div>}
            </Button>
            {isSuccess && <div className="text-green-500 text-center"> تم {data?.id?'تعديل':'اضافه'} العرض بنجاح</div>}
            {isError && <div className="text-red-500 text-center">Failed to add item</div>}
          </Form>
        
      )}
    </Formik>
  );
};
