import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useAddItemMutation } from "../../Redux/api";
import { TextField } from "../Fields/TextField";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/authSlice";

// Define the structure of the `user` prop based on `ItemType`
interface ItemType {
    name_ar: string;
    phone: string;
    email: string;
    ProfilePicture: any;
}

interface ProfileFormProps {
    user: Partial<ItemType>; // Make user of type Partial<ItemType> for compatibility
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
    const dispatch = useDispatch();

    const initialValues: Partial<ItemType> = {
        name_ar: user?.name_ar || '',
        phone: user?.phone || '',
        email: user?.email || '',
        ProfilePicture: "",
    };

    const validationSchema = Yup.object({
        name_ar: Yup.string()
            .min(3, "Name should be at least 3 characters")
            .required("الاسم الاول مطلوب"),
   
        phone: Yup.string()
            .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
            .min(10, "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل")
            .required("رقم الهاتف مطلوب"),
        email: Yup.string()
            .email("ادخل بريد الكتروني صحيح")
            .required("البريد الالكتروني مطلوب")
    });

    const onSubmit = async (values: Partial<ItemType>, { setSubmitting }: FormikHelpers<Partial<ItemType>>) => {
        try {
            await addItem({ endpoint: "profile/update", newItem: values }).unwrap();
            console.log("Item added successfully");
        dispatch(setUser({
            user: values,
          }));
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
                    <h2 className="text-xl">تعديل البيانات الشخصيه</h2>
                    <div className="flex gap-4 w-full md:w-3/4">
                        <TextField formik={formik} item={{ name: 'name_ar', type: 'text', placeHolder: " الاسم الاول " }} data={user?.name_ar} />
                    </div>
                    <div className="flex gap-4 w-full md:w-3/4">
                        <TextField formik={formik} item={{ name: 'phone', type: 'text', placeHolder: " رقم الهاتف" }} data={user?.phone} />
                        <TextField formik={formik} item={{ name: 'email', type: 'email', placeHolder: " البريد الالكترني" }} data={user?.email} />
                    </div>
                    <Button type="submit" className="w-1/2 bg-primaryColor text-white hover:white">
                        تعديل
                        {isLoading && <div className="loader"></div>}
                    </Button>
                    {isSuccess && <div className="text-green-500">Item added successfully!</div>}
                    {isError && <div className="text-red-500">Failed to add item</div>}
                </Form>
            )}
        </Formik>
    );
};
