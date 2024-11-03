// src/components/Login.tsx

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoginMutation } from "../Redux/api";
import { setUser } from "../Redux/authSlice";
import { Input } from "../Components/ui/input";
import { NewDataBtn } from "../Components/NewDataBtn/NewDataBtn";
import axios from "axios";

// Define the shape of the form values
interface LoginFormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState<boolean>(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  // Use the login mutation
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const response = await login(values).unwrap();

      // Log the entire response for debugging
      console.log("Login Response:", response);

      if (response.status === 200 && response.data) {
        dispatch(setUser({
          accessToken: response.data.token,
          user: response.data,
        }));
        navigate('/');
        setCheckLogin(true);
        console.log('Login successful');
      } else {
        setCheckLogin(false);
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      setCheckLogin(false);
      console.error('Login failed:', error);

      // Detailed error handling with AxiosError check
      if (axios.isAxiosError(error)) {
        console.error('Error details from backend:', error.response?.data);
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {() => (
            <Form className="loginForm flex flex-col gap-4">
              <div className="w-full">
                <Field
                  as={Input}
                  label="البريد الالكتروني"
                  variant="standard"
                  type="email"
                  name="email"
                  className="w-full"
                  autoComplete="username"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="form-group w-full">
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  label="كلمه المرور"
                  autoComplete="current-password"
                  variant="standard"
                  className="w-full custom-text-field"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <NewDataBtn text={isLoading ? "Loading..." : "send"} type="submit" />
            </Form>
          )}
        </Formik>
        {!checkLogin && (
          <span className="text-red-800 font-semibold">
            البريد الالكتروني او الباسورد غير صحيح
          </span>
        )}
      </div>
    </div>
  );
};
