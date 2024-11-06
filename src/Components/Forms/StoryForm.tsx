import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { Button } from "../ui/button";
import { FileField } from "../Fields/FileField";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";


interface InitialValues {

  service_vendor_id: string;
  images: File[];

}

export const StoryForm = ({ data }: { data: Partial<InitialValues> }) => {
  const serviceData = useSelector((state: RootState) => state.service);
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const initialValues: InitialValues = {
    service_vendor_id: serviceData?.data?.id,
    images: data?.image || [],

  };

  const validationSchema = Yup.object().shape({

    service_vendor_id: Yup.string().required("Service Vendor ID is required"),
    images: Yup.array().min(1, "At least 1 images are required").required("Images are required"),

  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      await addItem({ endpoint: "stories", newItem: values }).unwrap();
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => (

        <Form className="flex flex-col gap-3">

          <FileField type="post_images" formik={formik} endpoint="files" item={{ placeHolder: "اضافة صورة ", name: "images" }} />
          <Button type="submit" className="w-full sm:w-full bg-primaryColor text-white hover:white">
            اضافه قصه
            {isLoading && <div className="loader"></div>}
          </Button>
          {isSuccess && <div className="text-green-500">Item added successfully!</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>

      )}
    </Formik>
  );
};
