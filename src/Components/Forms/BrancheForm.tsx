import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { Button } from "../ui/button";

interface InitialValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  alternative_phone: string;
}

interface BrancheFormProps {
  data: Partial<InitialValues>;
  type: 'post' | 'put'; // Added type for 'post' or 'put'
}

export const BrancheForm: React.FC<BrancheFormProps> = ({ data, type }) => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

  const initialValues: InitialValues = {
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    address: data?.address || '',
    location: data?.location || '',
    alternative_phone: data?.alternative_phone || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("اسم الفرع مطلوب")
      .min(3, "يجب أن يحتوي اسم الفرع على 3 أحرف على الأقل")
      .max(50, "يجب ألا يتجاوز اسم الفرع 50 حرفاً"),

    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^(\+)?(\d{10,15})$/, "يجب أن يكون رقم الهاتف صحيحاً"),

    email: Yup.string()
      .email("يجب إدخال بريد إلكتروني صالح")
      .required("البريد الإلكتروني مطلوب"),

    address: Yup.string()
      .required("العنوان مطلوب")
      .min(5, "يجب أن يحتوي العنوان على 5 أحرف على الأقل"),

    location: Yup.string()
      .url("يجب أن يكون لينك جوجل صحيح")
      .required("لينك الموقع مطلوب"),

    alternative_phone: Yup.string()
      .matches(/^(\+)?(\d{10,15})$/, "يجب أن يكون رقم الهاتف البديل صحيحاً")
      .notRequired(),  // Alternative phone is optional
  });

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      if (type === 'post') {
        await addItem({ endpoint: "vendor-branchs", newItem: values }).unwrap();
      } else {
        await addItem({ endpoint: `vendor-branchs/${data?.id}?_method=PUT`, newItem: values }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add or update item:", error);
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
          <TextField formik={formik} item={{ name: 'name', type: 'text', placeHolder: "اسم الفرع" }} />
          
          <div className="flex gap-3">
            <TextField formik={formik} item={{ name: 'phone', type: 'text', placeHolder: "رقم الهاتف" }} />
            <TextField formik={formik} item={{ name: 'alternative_phone', type: 'text', placeHolder: "رقم هاتف آخر" }} />
          </div>

          <div className="flex gap-3">
            <TextField formik={formik} item={{ name: 'location', type: 'text', placeHolder: "لينك جوجل" }} />
            <TextField formik={formik} item={{ name: 'address', type: 'text', placeHolder: "العنوان" }} />
          </div>

          <TextField formik={formik} item={{ name: 'email', type: 'email', placeHolder: "بريد إلكتروني" }} />

          <Button type="submit" className="w-full sm:w-full bg-primaryColor text-white hover:white">
            {type === 'post' ? 'إضافة فرع' : 'تحديث الفرع'}
            {isLoading && <div className="loader"></div>}
          </Button>

          {isSuccess && <div className="text-green-500">تم إضافة العنصر بنجاح!</div>}
          {isError && <div className="text-red-500">فشل إضافة العنصر</div>}
        </Form>
      )}
    </Formik>
  );
};
