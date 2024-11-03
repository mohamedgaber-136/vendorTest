import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { Input } from "../ui/input";

interface FileFieldProps {
    item: {
        name: string;
        placeHolder?: string;
    };
    formik: any;
}

export const FileField: React.FC<FileFieldProps> = ({ item, formik }) => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const [fileNames, setFileNames] = useState<string[]>([]); // Array for file names
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Array for image previews

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        const maxFileSize = 10 * 1024 * 1024; // 10 MB
    
        if (!file) return;
    
        if (file.size > maxFileSize) {
            console.error("File size exceeds the maximum limit of 10 MB.");
            return;
        }
    
        // Preview the image
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            }
        };
        reader.readAsDataURL(file);
    
        try {
            // Upload the file to the server
            const formData = new FormData();
            formData.append("type", "service_vendor_images");
            formData.append("file", file);
    
            const response = await axios.post("https://testing.gawazy.com/api/v1/web/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
    
            // Get the file ID and add it to Formik field value array
            const fileId = response.data.data.id;
            const updatedFileList = formik.values[item.name] ? [...formik.values[item.name], { id: fileId }] : [{ id: fileId }];
    
            // Ensure the list has at least 4 items by checking the length after adding the new ID
            if (updatedFileList.length < 5) {
                // Only set the form field value if you have at least 4 items
                formik.setFieldValue(item.name, updatedFileList);
                formik.setFieldError(item.name, "You need to upload at least 4 files.");
            } else {
                formik.setFieldValue(item.name, updatedFileList);
            }
    
            // Update state with file name
            setFileNames((prev) => [...prev, file.name]);
        } catch (error) {
            console.error("Error sending data:", error);
            formik.setFieldError(item.name, "File upload failed.");
        }
    };
    

    const hasError = !!formik.errors[item.name] && formik.touched[item.name];

    return (
        <div>
            <Input
                type="file"
                id={item.name}
                className="w-full sm:w-full bg-white"
                isInvalid={hasError}
                onChange={handleFileChange}
            />

            {hasError && (
                <div className="text-red-500 text-sm">
                    {formik.errors[item.name]}
                </div>
            )}

            {/* Display previews and file names for each uploaded file */}
            <div className="flex gap-3">

            {imagePreviews.map((preview, index) => (
                <div key={index} className="mt-2 ">
                    <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                    />
                </div>
            ))}
            </div>
        </div>
    );
};
