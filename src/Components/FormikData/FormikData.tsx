import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddItemMutation } from "@/Redux/api";

// Define the FieldType type for form fields
type FieldType = {
  name: string;
  type: string;
  placeHolder?: string;
  label?: string;
  options?: { value: string; label: string }[]; // updated for dropdown select options
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
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

  const onSubmit = async (values: { [key: string]: string | File | null }) => {
    try {
      const endpoint = "service-vendors"; // Replace with your actual endpoint
      const newItem = { ...values }; // You can modify values if necessary
      await addItem({ endpoint, newItem }).unwrap(); // Call the mutation and await the result
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item: ", error);
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
                <Fragment key={index}>
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
                  <ErrorMessage
                    name={item.name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </Fragment>
              ) : item.type === "file" ? (
                <>
                  <Label htmlFor={item.name}>{item.placeHolder}</Label>
                  <Field name={item.name}>
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        type={item.type}
                        id={item.name}
                        className={`${fieldWidth ? "w-full" : "md:w-1/4"
                          } sm:w-full bg-white`}
                        isInvalid={
                          !!formik.errors[item.name] && !!formik.touched[item.name]
                        }
                      />
                    )}
                  </Field>
                </>
              ) : item.type === "select" ? (
                <>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Field name={item.name}>
                    {({ field, form }: { field: any; form: any }) => (
                      <Select
                        value={field.value} // Bind the current field value
                        onValueChange={(value) => {
                          form.setFieldValue(item.name, value); // Set the selected value in Formik state
                        }}
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
                </>
              ) : (
                <div>
                  <Field name={item.name}>
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        type={item.type}
                        id={item.name}
                        className={`${fieldWidth ? "w-full" : "md:w-1/2"
                          } sm:w-full bg-white`}
                        placeholder={item.placeHolder}
                        isInvalid={
                          !!formik.errors[item.name] && !!formik.touched[item.name]
                        }
                      />
                    )}
                  </Field>
                </div>
              )}
              <ErrorMessage
                name={item.name}
                component="div"
                className="text-red-500 text-sm"
              />
            </Fragment>
          ))}
          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`${fieldWidth ? "w-full" : "md:w-1/4"
              } sm:w-full bg-primaryColor text-white hover:white`}
          >
            {btnText}
          </Button>
          {isError && <div className="text-red-500">Failed to add item</div>}
          {isSuccess && <div className="text-green-500">Item added successfully!</div>}
        </Form>
      )}
    </Formik>
  );
};

export default FormikData;
