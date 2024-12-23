import { ModalBtn } from "../ModalBtn/ModalBtn";
import * as Yup from "yup";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FieldType } from "../../types";

// Define types for invoice and field data
type Invoice = {
  name: string;
  password: string;
  email: string;
  roles: string;
  service: string;
  startedAt: string;
  active: boolean;
};


// Sample invoices data
const invoices: Invoice[] = [
  {
    name: "Full Name 1",
    password: "كلمه السر",
    email: "email1@example.com",
    roles: "مدير عام",
    service: "ايجار سياره",
    startedAt: "10/15/2024",
    active: false,
  },
  {
    name: "Full Name 2",
    password: "كلمه السر",
    email: "email2@example.com",
    roles: "مدير عام",
    service: "ايجار سياره",
    startedAt: "10/15/2024",
    active: true,
  },
  {
    name: "Full Name 3",
    password: "كلمه السر",
    email: "email3@example.com",
    roles: "مدير عام",
    service: "ايجار سياره",
    startedAt: "10/15/2024",
    active: false,
  },
  // Add more entries as needed...
];

// Define fields for the form
const Fields: FieldType[] = [
  {
    type: "text",
    placeHolder: "اسم المشرف",
    name: "name",
  },
  {
    type: "email",
    placeHolder: "البريد الالكتروني",
    name: "email",
  },
  {
    type: "password",
    placeHolder: "كلمه السر",
    name: "password",
  },
  {
    type: "text",
    placeHolder: "الخدمه",
    name: "service",
  },
  {
    type: "text",
    name: "job",
    placeHolder: "اسم الوظيفه",
  },
];

// Initial values for the form
const initialValues = {
  name: "",
  email: "",
  password: "",
  service: "",
  job: "",
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters")
    .required("اسم المشرف مطلوب"),
  email: Yup.string()
    .email("ادخل بريد الكتروني صحيح")
    .required("البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("كلمه السر مطلوبه"),
  service: Yup.string().required("الخدمه مطلوبه"),
  job: Yup.string().required("اسم الوظيفه مطلوب"),
});

// Define keys for invoice
type InvoiceKeys = keyof Invoice; // This will be 'name' | 'password' | 'email' | 'roles' | 'service' | 'startedAt' | 'active'

// Function to create header cells for the table
const createHeadCells = (data: Invoice[]) => {
  const keys = Object.keys(data[0] || {});
  return keys.map((key) => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));
};

const headCells = createHeadCells(invoices);

// Function to render table cells based on the keys
const checkKeys = (key: InvoiceKeys, row: Invoice) => {
  if (key === "active") {
    return (
      <TableCell
        key={key}
        className={`font-medium px-3 text-center py-5 ${row[key] ? "text-green-600" : "text-red-600"}`}
        style={{ width: "150px" }}
      >
        {row[key] ? "نشطه" : "غير نشطه"}
      </TableCell>
    );
  } else {
    return (
      <TableCell
        key={key}
        className="font-medium px-3 text-right py-5"
        style={{ width: "150px" }}
      >
        {row[key]}
      </TableCell>
    );
  }
};

// Main Table component
export function TableComp() {
  return (
    <>
      <Table className="bg-white mb-4 rounded-xl border-0">
        <TableHeader className="rounded-3xl">
          <TableRow>
            {headCells.map((item) => (
              <TableHead
                key={item.id}
                className="text-right text-fontColor px-3 font-semibold"
                style={{ width: "150px" }}
              >
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>

      <Table className="bg-white">
        <TableBody>
          {invoices.map((row, index) => (
            <TableRow key={`row-${index}`} className="even:bg-gray-100">
              {Object.keys(row).map((key) => checkKeys(key as InvoiceKeys, row))}
              <TableCell
                className="text-right"
                style={{ width: "50px" }}
              >
                <MoreVertical className="w-5 h-5 text-gray-600 bg-transparent cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="flex justify-end my-5">
        <ModalBtn
          text="اضافه مشرف"
          Fields={Fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fieldWidth={true}
        />
      </div> */}
    </>
  );
}
