import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation, useGetItemsQuery } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { SelectField } from "../Fields/SelectField";
import { Button } from "../ui/button";

type ItemService = { id: string; value: boolean; name: string; };

interface InitialValues {
  supervisor_name: string;
  service_id: string;
  email: string;
  password: string;
  job_Name: string;


}

export const SuperVisorForm = () => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
  const { data: item } = useGetItemsQuery("services");

  const serviceOptions = item ? item.data.map((service: ItemService) => ({ value: service.id, label: service.name })) : [];

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
    supervisor_name: "",
    service_id: "",
    email: "",
    password: "",
    job_Name: "",

  };

  const validationSchema = Yup.object().shape({
    supervisor_name: Yup.string()
      .min(3, "يجب أن يحتوي اسم المشرف على 3 أحرف على الأقل")
      .required("اسم المشرف مطلوب"),
    
    service_id: Yup.string()
      .required("نوع الخدمة مطلوب"),
    
    email: Yup.string()
      .email("يجب أن يكون بريدًا إلكترونيًا صالحًا")
      .required("البريد الإلكتروني مطلوب"),
    
    password: Yup.string()
      .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
    
    job_Name: Yup.string()
      .min(3, "يجب أن يحتوي اسم الوظيفة على 3 أحرف على الأقل")
      .required("اسم الوظيفة مطلوب"),
  });
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col gap-3">
          <TextField formik={formik} item={{ name: 'supervisor_name', type: 'text', placeHolder: " اسم المشرف" }} />
          <SelectField item={{ placeHolder: "اسم الخدمه ", name: "service_id", options: serviceOptions }} setCityId={null} />
          <TextField formik={formik} item={{ name: 'email', type: 'email', placeHolder: "الايميل   " }} />
          <TextField formik={formik} item={{ name: 'password', type: 'password', placeHolder: "  كلمه السر   " }} />
          <TextField formik={formik} item={{ name: 'job_Name', type: 'text', placeHolder: "اسم الوظيفه  " }} />
          <Button type="submit" className={`w-full sm:w-full bg-primaryColor text-white hover:white`}>
            اضافه خدمه
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
