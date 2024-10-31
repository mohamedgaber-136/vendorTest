import * as Yup from "yup";
import { FieldType } from "../../types";
type InitialValues = {
    [key: string]: string | File | null;
};
interface FormikDataProps {
    Fields: FieldType[];
    initialValues: InitialValues;
    validationSchema: Yup.ObjectSchema<any>;
    btnText: string;
    fieldWidth?: boolean;
}
declare const FormikData: React.FC<FormikDataProps>;
export default FormikData;
