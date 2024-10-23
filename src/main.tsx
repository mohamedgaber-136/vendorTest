import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/Store";
import { api } from "./Redux/api"; // Assuming api.ts is already typed
import { useSelector } from "react-redux";
import { RootState } from "./Redux/Store"; // Import your RootState type

// Define the props for PrivateRoute component
interface PrivateRouteProps {
  element: JSX.Element; // Expecting a JSX element
  auth: string; // Name of the auth slice
  nav: string; // Navigation path if not authenticated
}
// this function used to Protect Some Routes 
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, auth, nav }) => {
  // Access the auth slice from the Redux store
  const { accessToken } = useSelector((state: RootState) => state[auth]);
  
  const isAuthenticated = () => {
    return (
      accessToken !== null &&
      accessToken !== undefined &&
      accessToken !== ""
    );
  };

  return isAuthenticated() ? element : <Navigate to={nav} />;
};

const RouterStructure: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />} /> 
        {/* Add your other routes here */}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

// Create the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={api}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterStructure />
      </PersistGate>
    </ApiProvider>
  </StrictMode>
);
