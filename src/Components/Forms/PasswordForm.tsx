import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { Button } from "../ui/button";


interface InitialValues {
    oldPassword: string;
    newPassword: string;
    ConfirmPassword: string;



}

export const PasswordForm = () => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();


  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      await addItem({ endpoint: "profile/update-password", newItem: values }).unwrap();
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
    console.log(values);
  };

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    ConfirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, "يجب أن تكون كلمة المرور القديمة 8 أحرف على الأقل")
      .required("كلمه المرور القديمه مطلوبة"),
    newPassword: Yup.string()
      .min(8, "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل")
      .required("كلمه المرور الجديده مطلوبة"),
    ConfirmPassword: Yup.string()
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
           <TextField formik={formik} item={{ name: 'oldPassword', type: 'password', placeHolder: "كلمه المرور الحاليه " }} />
           <TextField formik={formik} item={{ name: 'newPassword', type: 'password', placeHolder: " كلمه مرور جديده   " }} />
           <TextField formik={formik} item={{ name: 'ConfirmPassword', type: 'password', placeHolder: "تأكيد كلمه المرور    " }} />
            </div>
          <Button type="submit" className={`w-1/2 bg-primaryColor text-white hover:white`}>
             تعديل
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
