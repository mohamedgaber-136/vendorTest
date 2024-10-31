import * as Yup from "yup";
import { FieldType } from "../../types";
interface ModalBtnProps {
    text: string;
    Fields: FieldType[];
    initialValues: {
        [key: string]: string | File | null;
    };
    validationSchema: Yup.ObjectSchema<any>;
    fieldWidth?: boolean;
}
export declare const ModalBtn: React.FC<ModalBtnProps>;
export {};
