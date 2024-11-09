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
  post_content: string;
  images: File[];
}

interface PostFormProps {
  data: Partial<InitialValues>;
  type: "post" | "update";
}

export const PostForm: React.FC<PostFormProps> = ({ data, type }) => {
  const serviceData = useSelector((state: RootState) => state.service);
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

  const initialValues: InitialValues = {
    service_vendor_id: serviceData?.data?.id || "",
    post_content: data?.post_content || "",
    images: data?.images || [],
  };

  const validationSchema = Yup.object().shape({
    service_vendor_id: Yup.string().required("Service Vendor ID is required"),
    post_content: Yup.string().min(10, "At least 10 characters are required").required("Post content is required"),
    images: Yup.array().min(1, "At least 1 image is required").required("Images are required"),
  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      if (type === "post") {
        await addItem({ endpoint: "posts", newItem: values }).unwrap();
      } else if (type === "update") {
        await addItem({ endpoint: `posts/${data.id}?_method=PUT`, newItem: values }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col gap-3">
          <TextField
            formik={formik}
            item={{ name: "post_content", type: "textarea", placeHolder: "اضافه منشور" }}
          />
          <FileField
            type="post_images"
            formik={formik}
            endpoint="files"
            item={{ placeHolder: "اضافة صورة", name: "images" }}
          />
          {data?.images?.map((image, index) => (
            <img key={index} src={image.url} alt="postImg" width="100px" />
          ))}
          <Button type="submit" className="w-full sm:w-full bg-primaryColor text-white hover:white">
            {type === "update" ? "تعديل" : "اضافه"} منشور
            {isLoading && <div className="loader"></div>}
          </Button>
          {isSuccess && <div className="text-green-500 text-center">تم {data?.id?'تعديل':'اضافه'} بنجاح</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>
      )}
    </Formik>
  );
};
