import { Field, ErrorMessage, FieldProps } from "formik";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

interface FileFieldProps {
    item: {
        name: string, placeHolder?: string; // An optional placeholder for the input
    };

    formik: any;
}

export const FileField: React.FC<FileFieldProps> = ({ item, formik }) => {
    const [fileName, setFileName] = useState<string | null>(null); // State to manage the file name
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, itemName: string) => {
        const file = event.currentTarget.files?.[0]; // Get the first selected file
        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {

                    setImagePreview(reader.result);
                } else {
                    setImagePreview(null);

                }
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
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
            setFileName(file.name); // Set the file name

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

    return (
        <>
            <Field name={item.name}>
                {({ field }: FieldProps) => (
                    <Input
                        {...field}
                        type="file"
                        id={item.name}
                        className={`w-full sm:w-full bg-white`}
                        isInvalid={!!formik.errors[item.name] && formik.touched[item.name]}
                        onChange={(event) => handleFileChange(event, item.name)} // Pass formik to handleFileChange
                    />
                )}
            </Field>
            {fileName && <div className="mt-2 text-gray-600 hidden">Selected file: {fileName}</div>} {/* Display the file name */}
            <ErrorMessage name={item.name} component="div" className="text-red-500 text-sm" />
            {imagePreview && (
                <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                    }}
                />)}

        </>
    );
};
