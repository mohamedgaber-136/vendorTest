import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Yup from "yup";
import FormikData from "../Components/FormikData/FormikData";
export const ProfileSettings = () => {
    // Form Data For Profile Settings
    const Fields = [
        {
            type: "text",
            placeHolder: "الاسم الاول",
            name: "FirstName",
        },
        {
            type: "text",
            placeHolder: "الاسم الثاني",
            name: "SecondName",
        },
        {
            type: "text",
            placeHolder: " الهاتف",
            name: "Telephone",
        },
        {
            type: "email",
            placeHolder: "البريد الالكتروني",
            name: "email",
        },
        {
            type: "file",
            name: "ProfilePicture",
            placeHolder: "الصوره الشخصيه",
        },
    ];
    const initialValues = {
        FirstName: "",
        SecondName: "",
        Telephone: "",
        name: "",
        ProfilePicture: "",
    };
    const initialValuesPassword = {
        oldPassword: "",
        newPassword: "",
        ConfirmPassword: "",
    };
    //  Form Data For Changing Password 
    const validationSchema = Yup.object({
        FirstName: Yup.string()
            .min(3, "Name should be at least 3 characters")
            .required("الاسم الاول مطلوب"),
        SecondName: Yup.string()
            .min(3, "Name should be at least 3 characters")
            .required("الاسم الثاني مطلوب"),
        Telephone: Yup.number()
            .min(3, "Name should be at least 3 characters")
            .required("رقم الهاتف مطلوب"),
        email: Yup.string()
            .email("ادخل بريد الكتروني صحيح")
            .required("البريد الالكتروني مطلوب"),
    });
    const validationPassword = Yup.object({
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
    const passwordFFields = [
        {
            type: "password",
            placeHolder: "كلمه المرور القديمه ",
            name: "oldPassword",
        },
        {
            type: "password",
            placeHolder: "كلمه المرور الجديده ",
            name: "newPassword",
        },
        {
            type: "password",
            placeHolder: "تأكيد كلمه المرور ",
            name: "ConfirmPassword",
        },
    ];
    return (_jsxs("div", { className: "p-5 ", children: [_jsx("h1", { className: "text-fontColor text-4xl font-semibold mb-5", children: "\u0627\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628" }), _jsxs("div", { className: "border-b-2 pb-2 ", children: [_jsx("h2", { className: "text-primaryColor text-2xl font-semibold mb-5", children: "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A" }), _jsx(FormikData, { Fields: Fields, initialValues: initialValues, validationSchema: validationSchema, btnText: "تحديث الملف الشخصي" })] }), _jsxs("div", { className: "border-b-2 py-5 ", children: [_jsx("h1", { className: "text-primaryColor text-2xl font-semibold mb-5", children: "\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0647 \u0627\u0644\u0645\u0631\u0648\u0631" }), _jsx(FormikData, { Fields: passwordFFields, initialValues: initialValuesPassword, validationSchema: validationPassword, btnText: "تحديث  كلمه المرور" })] })] }));
};
