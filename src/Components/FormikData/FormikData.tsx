import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import * as Yup from "yup";

// Define the FieldType type for form fields
type FieldType = {
  name: string;
  type: string;
  placeHolder?: string;
  label?: string;
  options?: string[]; // for radio button options
};

// Define the Props type for FormikData component
interface FormikDataProps {
  Fields: FieldType[];
  initialValues: { [key: string]: string | File | null };
  validationSchema: Yup.ObjectSchema<any>;
  btnText: string;
  fieldWidth?: boolean;
}

const FormikData: React.FC<FormikDataProps> = ({
  Fields,
  initialValues,
  validationSchema,
  btnText,
  fieldWidth,
}) => {
  const onSubmit = (values: { [key: string]: string | File | null }) => {
    console.log("Form data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col gap-3">
          {Fields.map((item, index) =>
            item.type === "radio" ? (
              <Fragment key={index}>
                <Label>{item.label}</Label>
                <div role="group" aria-labelledby={item.name} className="flex">
                  {item.options?.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <Field
                        type="radio"
                        name={item.name}
                        value={option}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name={item.name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </Fragment>
            ) : item.type === "file" ? (
              <Fragment key={index}>
                <Label htmlFor={item.name}>{item.placeHolder}</Label>
                <Field name={item.name}>
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      type={item.type}
                      id={item.name}
                      className={`${
                        fieldWidth ? "w-full" : "md:w-1/4"
                      } sm:w-full bg-white`}
                      isInvalid={
                        !!formik.errors[item.name] && !!formik.touched[item.name]
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name={item.name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </Fragment>
            ) : (
              <div key={index} >
                <Field name={item.name}>
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      type={item.type}
                      id={item.name}
                      className={`${
                        fieldWidth ? "w-full" : "md:w-1/2"
                      } sm:w-full bg-white`}
                      placeholder={item.placeHolder}
                      isInvalid={
                        !!formik.errors[item.name] && !!formik.touched[item.name]
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name={item.name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )
          )}
          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`${
              fieldWidth ? "w-full" : "md:w-1/4"
            } sm:w-full bg-primaryColor text-white hover:white`}
          >
            {btnText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikData;
