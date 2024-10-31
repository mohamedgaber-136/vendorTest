import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps, FormikHelpers } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader } from "../Loader/Loader";
import { useAddItemMutation } from "../../Redux/api";
import { FieldType } from "../../types";

// Define the type for form fields


// Define the type for form initial values
type InitialValues = {
  [key: string]: string | File | null;
};

// Define the Props type for FormikData component
interface FormikDataProps {
  Fields: FieldType[];
  initialValues: InitialValues;
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
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      const endpoint = "service-vendors";
      const newItem = { ...values };
      await addItem({ endpoint, newItem }).unwrap();
      console.log("Item added successfully");
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
          {Fields.map((item, index) => (
            <Fragment key={index}>
              {item.type === "radio" ? (
                <Fragment>
                  <Label>{item.label}</Label>
                  <div role="group" aria-labelledby={item.name} className="flex">
                    {item.options?.map((option, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <Field
                          type="radio"
                          name={item.name}
                          value={option.value}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
                </Fragment>
              ) : item.type === "file" ? (
                <>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Field name={item.name}>
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        type="file"
                        id={item.name}
                        className={`${fieldWidth ? "w-full" : "md:w-1/4"} sm:w-full bg-white`}
                        isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                      />
                    )}
                  </Field>
                  <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
                </>
              ) : item.type === "select" ? (
                <>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Field name={item.name}>
                    {({ field, form }: FieldProps) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => form.setFieldValue(item.name, value)}
                      >
                        <SelectTrigger className={`${fieldWidth ? "w-full" : "md:w-1/2"} sm:w-full bg-white`} dir="rtl">
                          <SelectValue placeholder={item.placeHolder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {item.options?.map((option, idx) => (
                              <SelectItem key={idx} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
                </>
              ) : (
                <div>
                  <Field name={item.name}>
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        type="text"
                        id={item.name}
                        className={`${fieldWidth ? "w-full" : "md:w-1/2"} sm:w-full bg-white`}
                        placeholder={item.placeHolder}
                        isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                      />
                    )}
                  </Field>
                  <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
                </div>
              )}
            </Fragment>
          ))}
          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`${fieldWidth ? "w-full" : "md:w-1/4"} sm:w-full bg-primaryColor text-white hover:white`}
          >
            {btnText}
          </Button>
          {isLoading && <Loader />}
          {isSuccess && <div className="text-green-500">Item added successfully!</div>}
          {isError && <div className="text-red-500">Failed to add item</div>}
        </Form>
      )}
    </Formik>
  );
};

export default FormikData;
