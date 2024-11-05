import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface Option {
    value: string; // Define the type of the option value
    label: string;
     // Define the type of the option label
}

interface RadioFieldProps {
    item: {
        name: string; // The name of the radio group
        options?: Option[];
        placeHolder:string; // An optional array of options
    };
    
    formik:any;
}

export const RadioField: React.FC<RadioFieldProps> = ({ item,formik }) => {
    console.log(formik.values[item.name],'values')
    console.log(item.name,'type')
    return (
        < div  className='flex flex-col w-full   '>
            <p className='text-fontColor mb-2 font-semibold'>{item.placeHolder}</p>
            <div role="group" aria-labelledby={item.name} className="flex">
                {item.options?.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                        <Field type="radio" name={item.name} value={  formik.values[item.name] || option.value} />
                        {option.label}
                    </label>
                ))}
            </div>
            <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
        </div>
    );
};
