import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux/Store";
import { Provider, useSelector } from "react-redux";
import { RootState } from "./Redux/Store"; // Import your RootState type
import { MainServices } from "./Pages/MainServices.tsx";
import { ProfileSettings } from "./Pages/ProfileSettings.tsx";
import { TechSupport } from "./Pages/TechSupport.tsx";
import { SuperVisors } from "./Pages/SuperVisors.tsx";
import { Login } from "./Pages/Login.tsx";
import { SingleService } from "./Pages/SingleService.tsx";
import { ServiceLayout } from "./Components/RootLayout/ServiceLayout.tsx";
import { Service } from "./Pages/Service.tsx";
// Define the props for PrivateRoute component
interface PrivateRouteProps {
  element: JSX.Element; // Expecting a JSX element
  auth: string; // Name of the auth slice
  nav: string; // Navigation path if not authenticated
}

// this function used to Protect Some Routes
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, nav }) => {
  // Access the auth slice from the Redux store
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = () => {
    return (
      accessToken !== null && accessToken !== undefined && accessToken !== ""
    );
  };

  return isAuthenticated() ? element : <Navigate to={nav} />;
};

const RouterStructure: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute nav="/login" element={<App />} />}
        >
          <Route index={true} element={<MainServices />} />
          <Route path="/profileSetting" element={<ProfileSettings />} />
          <Route path="/Support" element={<TechSupport />} />
          <Route path="/Supervisors" element={<SuperVisors />} />
        </Route>
        <Route
          path="/Services/:ServiceName"
          element={<PrivateRoute nav="/login" element={<ServiceLayout />} />}
        >
          <Route index element={<Service />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

// Create the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterStructure />
      </PersistGate>
    </Provider>
  </StrictMode>
);
