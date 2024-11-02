import React from 'react';
import { Input } from '../ui/input';
import { Field, ErrorMessage, FieldProps } from "formik";

interface TextFieldProps {
    item: {
        name: string; // The name of the input field
        type: string; // The type of the input (e.g., "text", "email", etc.)
        placeHolder?: string; // An optional placeholder for the input
    };
    formik: any
}

export const TextField: React.FC<TextFieldProps> = ({ item, formik }) => {
    return (
        <>
            <Field name={item.name}>
                {({ field }: FieldProps) => (
                    <Input
                        {...field}
                        type={item.type}
                        id={item.name}
                        className={`w-full sm:w-full bg-white`}
                        placeholder={item.placeHolder}
                        isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                    />
                )}
            </Field>
            <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
        </>
    );
};
