import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useGetItemsQuery, useGetVendorServicesQuery } from "../Redux/api";
import { Loader } from "../Components/Loader/Loader";
import { Services } from "../Components/Services/Services";
import { ModalBtn } from "../Components/ModalBtn/ModalBtn";
export const MainServices = () => {
    const { user } = useSelector((state) => state.auth);
    const vendorId = user ? user.id : null;
    // Fetch vendor services and items
    const { data: vendorServices, error: vendorError, isLoading: vendorLoading } = useGetVendorServicesQuery(vendorId);
    const { data: item, error: itemError, isLoading: itemLoading } = useGetItemsQuery('services');
    // Check if item is defined and extract service options
    const serviceOptions = item ? item.data.map((service) => ({
        value: service.id,
        label: service.name,
    })) : [];
    const Fields = [
        {
            type: "text",
            placeHolder: "الاسم التجاري",
            name: "commercial_name",
        },
        {
            type: "select",
            placeHolder: "نوع الخدمة",
            name: "service_id",
            options: serviceOptions,
        },
        {
            type: "text",
            placeHolder: "المحافظة",
            name: "province",
        },
        {
            type: "text",
            placeHolder: "المدينة",
            name: "city_id",
        },
        {
            type: "text",
            placeHolder: "رقم الهاتف",
            name: "mobile",
        },
        {
            type: "text",
            placeHolder: "رقم تواصل واتس اب",
            name: "whatsapp",
        },
        {
            type: "textarea",
            placeHolder: "وصف الخدمة",
            name: "description",
        },
        {
            type: "file",
            placeHolder: "اضافة صورة الخدمة",
            name: "images",
        },
        {
            type: "file",
            placeHolder: "اضافة صورة الغلاف",
            name: "cover",
        },
        {
            type: "text",
            placeHolder: " السعر تبدا من ",
            name: "price",
        },
        {
            type: "radio",
            placeHolder: " هل أنت",
            name: "vendor_type",
            options: [
                {
                    label: "فرد",
                    value: "1",
                },
                {
                    label: "شركة",
                    value: "2",
                },
            ],
        },
    ];
    // Set up initial values for each field
    const initialValues = {
        commercial_name: "",
        service_id: "",
        province: "",
        city_id: "",
        mobile: "",
        whatsapp: "",
        description: "",
        images: null,
        cover: null,
        price: "",
        vendor_type: "",
        price_type: "1",
    };
    // Create validation schema using Yup
    const validationSchema = Yup.object().shape({
        commercial_name: Yup.string()
            .min(3, "يجب أن يحتوي الاسم التجاري على 3 أحرف على الأقل")
            .required("الاسم التجاري مطلوب"),
        service_id: Yup.string().required("نوع الخدمة مطلوب"),
        province: Yup.string().required("المحافظة مطلوبة"),
        city_id: Yup.string().required("المدينة مطلوبة"),
        mobile: Yup.string()
            .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
            .min(10, "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل")
            .required("رقم الهاتف مطلوب"),
        whatsapp: Yup.string()
            .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الواتس اب على أرقام فقط")
            .min(10, "يجب أن يحتوي رقم الواتس اب على 10 أرقام على الأقل")
            .required("رقم تواصل واتس اب مطلوب"),
        description: Yup.string()
            .min(10, "يجب أن يحتوي الوصف على 10 أحرف على الأقل")
            .required("وصف الخدمة مطلوب"),
        price: Yup.string().required(" السعر مطلوب"),
        vendor_type: Yup.string()
            .oneOf(["2", "1"], "يرجى اختيار نوع المنشأ")
            .required("نوع المنشأ مطلوب"),
    });
    return (_jsxs("div", { className: "flex flex-wrap gap-10 justify-center items-center", children: [(vendorLoading || itemLoading) && _jsx(Loader, {}), (vendorError || itemError) && _jsx("p", { children: "\u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0627\u062A" }), vendorServices && vendorServices.data.map((service, index) => (_jsx(Services, { data: service }, index))), _jsx(ModalBtn, { text: "اضافه خدمه رئيسيه", Fields: Fields, initialValues: initialValues, validationSchema: validationSchema, fieldWidth: true })] }));
};
