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

type Goverdata = { id: string; name_ar: string; name_en: string; label: string; created_at: any; updated_at: any };

interface InitialValues {
  vendor_product: boolean;
  vendor_id: any;
  city_id: string;
  name: string;
  service_vendor_id: string;
  governorate_id: string;
  service_id:string;
  description: string;
  product_images: File[];
  price_to: string;
  price_from: string;
  price_type:string;
  purchase_type:string;
}

export const ProductForm = ({ data }: { data: Partial<InitialValues> }) => {
  const serviceData = useSelector((state: RootState) => state.service);
  const { user } = useSelector((state: RootState) => state.auth);
  const vendorId = user ? user.id : null;
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const [cityId, setCityId] = useState<string | null>(null);
  const { data: Cities  } = useGetCitiesQuery(cityId ?? "", { skip: !cityId });
  const { data: govers } = useGetItemsQuery("governorates?limit=1000");
  const { data: subservices,isLoading:loading } = useGetItemsQuery(`sub-services?ParentId=${serviceData?.data?.service_id}&limit=1000`);
  const goversOption = govers ? govers.data.map((governorate: Goverdata) => ({ value: governorate.id, label: governorate.name })) : [];
  const initialValues: InitialValues = {
    vendor_product: true,
    product_images: data?.product_images || [],
    "purchase_type":"1",
    vendor_id: vendorId,
    "price_type":"2",
    service_id:data?.service_id || '',
    price_from: "",
    price_to: data?.price_to || "",
    service_vendor_id: serviceData?.data?.id,
    governorate_id: data?.governorate_id || "",
    city_id: data?.city_id || "",
    name: data?.name || "",
    description: data?.description || "",
  };

  const validationSchema = Yup.object().shape({
    vendor_product: Yup.boolean().required(),
    product_images: Yup.array().min(1, "At least 1 images are required").required("Images are required"),
    vendor_id: Yup.string().required("Vendor ID is required"),
    city_id: Yup.string().required("City ID is required"),
    name: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
    service_vendor_id: Yup.string().required("Service Vendor ID is required"),
    service_id: Yup.string().required(" Service ID is required"),
    governorate_id: Yup.string().required("Governorate is required"),
    description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
    price_to: Yup.string().max(6,'maximum 6 numbers').required("Price is required"),
    price_from: Yup.string().max(6,'maximum 6 numbers').required("Old price is required"),
  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      await addItem({ endpoint: "products", newItem: values }).unwrap();
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
      //  validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => (
        loading ? (
          <div className="w-full flex justify-center items-center ">
            <div className="loader"></div>
          </div>
        ) : (
          <Form className="flex flex-col gap-3">
            <TextField formik={formik} item={{ name: 'name', type: 'text', placeHolder: "اسم المنتج " }} />
            <SelectField item={{ placeHolder: "الخدمه الفرعيه ", name: "service_id", options: subservices.data }} setCityId={null} />
            <div className="flex gap-3">
              <SelectField item={{ placeHolder: "المحافظة", name: "governorate_id", options: goversOption }} setCityId={setCityId} />
              <SelectField item={{ placeHolder: "المدينة", name: "city_id", options: Cities?.data ?? [] }} setCityId={null} />
            </div>
          
            <TextField formik={formik} item={{ name: 'description', type: 'textarea', placeHolder: "وصف المنتج " }} />
            <div className="flex gap-3">

              <TextField formik={formik} item={{ name: 'price_to', type: 'text', placeHolder: "السعر الجديد   " }} />
              <TextField formik={formik} item={{ name: 'price_from', type: 'text', placeHolder: "السعر القديم   " }} />
            </div>
            <FileField type="product_images" formik={formik} endpoint="files" item={{ placeHolder: "ضافة صورة ", name: "product_images" }} />
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
