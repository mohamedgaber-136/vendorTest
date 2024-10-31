import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";


export const TechSupport = () => {
  // Tech Support Form 
  const initialValues = {
    Subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    Subject: Yup.string()
      .min(3, "يجب أن يكون الموضوع 3 أحرف على الأقل")
      .required("الموضوع مطلوب"),
    message: Yup.string()
      .min(10, "يجب أن تكون الرسالة 10 أحرف على الأقل")
      .required("الرسالة مطلوبة"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-fontColor text-center mb-4 font-semibold">
        الدعم الفني
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="flex flex-col gap-3 mt-4 justify-center  w-3/4">
            <div className="w-full">
              <Field
                name="Subject"
                as={Input}
                id="Subject"
                type="text"
                placeholder="موضوع الرسالة"
                className=" w-full bg-white"
              />
              <ErrorMessage
                name="Subject"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="w-full">
              <Field
                name="message"
                as="textarea"
                id="message"
                placeholder="اكتب هنا"
                className=" w-full bg-white p-2"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className=" sm:w-full bg-primaryColor text-white hover:white"
            >
              ارسال
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
