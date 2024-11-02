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
import axios from "axios";

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
  endpoint: string;
}

const FormikData: React.FC<FormikDataProps> = ({
  Fields,
  initialValues,
  validationSchema,
  btnText,
  fieldWidth,
  endpoint,
}) => {
  const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, itemName: string, formik: any) => {
    const file = event.currentTarget.files?.[0]; // Get the first selected file
    const maxFileSize = 10 * 1024 * 1024; // 10 MB

    // Check if file exists
    if (!file) {
      setFileName(null);
      formik.setFieldValue(itemName, null); // Reset Formik field value
      return; // Exit if no file is selected
    }

    if (file.size > maxFileSize) {
      console.error("File size exceeds the maximum limit of 10 MB.");
      setFileName(null);
      formik.setFieldValue(itemName, null); // Reset Formik field value
      return; // Exit the function if the file is too large
    }

    try {
      const endpoint = 'https://testing.gawazy.com/api/v1/web/files';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'service_vendor_images');

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      setFileName(file.name);

      // Set the field value on successful upload (only the ID)
      const newValue = [{ "id": response.data.data.id }];
      if (itemName === 'image') {
        formik.setFieldValue('images', newValue);
      } else {
        formik.setFieldValue('cover', newValue);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      // Optionally set an error message in Formik
      formik.setFieldError(itemName, "File upload failed.");
    }
  };

  const onSubmit = async (values: InitialValues, { setSubmitting }: FormikHelpers<InitialValues>) => {
    try {
      const newItem = { ...values };
      await addItem({ endpoint, newItem }).unwrap();
      console.log("Item added successfully");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
    console.log(values)
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
              <Label htmlFor={item.name}>{item.label}</Label>
              {item.type === "radio" ? (
                <div role="group" aria-labelledby={item.name} className="flex">
                  {item.options?.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <Field type="radio" name={item.name} value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : item.type === "file" ? (
                <Field name={item.name}>
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="file"
                      id={item.name}
                      className={`${fieldWidth ? "w-full" : "md:w-1/4"} sm:w-full bg-white`}
                      isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                      onChange={(event) => {handleFileChange(event, item.name, formik)
                       
                      }} // Pass formik to handleFileChange
                    />
                  )}
                </Field>
              ) : item.type === "select" ? (
                <Field name={item.name}>
                  {({ field, form }: FieldProps) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        form.setFieldValue(item.name, value);
                       
                      }}                    >
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
              ) : (
                <Field name={item.name}>
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type={item.type}
                      id={item.name}
                      className={`${fieldWidth ? "w-full" : "md:w-1/2"} sm:w-full bg-white`}
                      placeholder={item.placeHolder}
                      isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                    />
                  )}
                </Field>
              )}
              <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
            </Fragment>
          ))}
          <Button
            type="submit"
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
