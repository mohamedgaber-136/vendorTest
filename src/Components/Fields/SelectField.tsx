import { Field, ErrorMessage, FieldProps } from "formik";

interface Option {
  id?: string; // Optional ID for the option
  value: string; // The value of the option
  label: string; // The label displayed for the option
}

interface SelectFieldProps {
  item: {
    name: string; // The name of the select field
    placeHolder?: string; // An optional placeholder for the select
    options?: Option[]; // An optional array of options for the select
  };
  setCityId:any; // A function to set the city ID
}

export const SelectField: React.FC<SelectFieldProps> = ({ item, setCityId }) => {
  return (
    <>
      <Field name={item.name}>
        {({ field, form }: FieldProps) => (
          <div className="relative">
            <select
              {...field}
              className={`w-full sm:w-full bg-white border border-gray-300 rounded p-2`}
              dir="rtl"
              onChange={(e) => {
                const selectedValue = e.target.value;
                form.setFieldValue(item.name, selectedValue);
                if (item.name === "governorate_id") {
                  setCityId(selectedValue); // Set city ID when governorate_id changes
                }
              }}
              value={field.value}
            >
              <option value="" disabled>
                {item.placeHolder || "Select an option"}
              </option>
              {item.options?.map((option, idx) => (
                <option key={idx} value={option.id ? option.id : option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </Field>
      <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
    </>
  );
};
