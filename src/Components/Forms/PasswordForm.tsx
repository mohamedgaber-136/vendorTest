import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { Button } from "../ui/button";


interface InitialValues {
  old_password: string;
  password: string;
  password_confirmation: string;



}

export const PasswordForm = () => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();


  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      const updatedPassword = await addItem({ endpoint: "user/update-password", newItem: values }).unwrap();
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .min(8, "يجب أن تكون كلمة المرور القديمة 8 أحرف على الأقل")
      .required("كلمه المرور القديمه مطلوبة"),
      password: Yup.string()
      .min(8, "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل")
      .required("كلمه المرور الجديده مطلوبة"),
      password_confirmation: Yup.string()
      .oneOf([Yup.ref("newPassword")], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمه المرور مطلوب"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col gap-3 ">
          <h2 className="text-xl">تعديل كلمه المرور</h2>
          <div className="flex flex-col gap-4 w-full md:w-3/4 ">
            <TextField formik={formik} item={{ name: 'old_password', type: 'password', placeHolder: "كلمه المرور الحاليه " }} />
            <TextField formik={formik} item={{ name: 'password', type: 'password', placeHolder: " كلمه مرور جديده   " }} />
            <TextField formik={formik} item={{ name: 'password_confirmation', type: 'password', placeHolder: "تأكيد كلمه المرور    " }} />
          </div>
          <Button type="submit" className={`w-1/2 bg-primaryColor text-white hover:white`}>
            تعديل
            {isLoading && <div className="loader"></div>
            }
          </Button>
          {isSuccess && <div className="text-green-500">  تم تعديل كلمه المرور بنجاح</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>
      )}
    </Formik>
  );
};
