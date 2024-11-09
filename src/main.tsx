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
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux/Store";
import { Provider, useSelector } from "react-redux";
import { RootState } from "./Redux/Store";
import { MainServices } from "./Pages/MainServices";
import { ProfileSettings } from "./Pages/ProfileSettings";
import { TechSupport } from "./Pages/TechSupport";
import { SuperVisors } from "./Pages/SuperVisors";
import { Login } from "./Pages/Login";
import { ServiceLayout } from "./Components/RootLayout/ServiceLayout";
import { Service } from "./Pages/Service";
import { EditService } from "./Pages/EditService";
import { ServiceContextProvider } from './Context/ServiceContext';
import { ServiceOffers } from "./Pages/ServiceOffers";
import { ServicePosts } from "./Pages/ServicePosts";
import { ServicesProducts } from "./Pages/ServicesProducts";
import { ServiceBranches } from "./Pages/ServiceBranches";
import { ServiceStory } from "./Pages/ServiceStory";
import { ServiceAds } from "./Pages/ServiceAds";
import { ServicePromotion } from "./Pages/ServicePromotion";
import { SubServices } from "./Pages/SubServices";
import { ServiceNotifications } from "./Pages/ServiceNotifactions";

interface PrivateRouteProps {
  element: JSX.Element;
  nav: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, nav }) => {
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
          <Route index element={<MainServices />} />
          <Route path="/home" element={<MainServices />} /> 
          <Route path="/profileSetting" element={<ProfileSettings />} />
          <Route path="/Supervisors" element={<SuperVisors />} />
          <Route path="/Support" element={<TechSupport />} />
        </Route>
        <Route
          path="/Services/:ServiceName"
          element={<PrivateRoute nav="/login" element={<ServiceLayout />} />}
        >
          <Route index element={<Service />} />
          <Route path="EditService" element={<EditService />} />
          <Route path="SubServices" element={<SubServices />} />
          <Route path="Offers" element={<ServiceOffers />} />
          <Route path="Posts" element={<ServicePosts />} />
          <Route path="Products" element={<ServicesProducts />} />
          <Route path="branches" element={<ServiceBranches />} />
          <Route path="story" element={<ServiceStory />} />
          <Route path="ads" element={<ServiceAds />} />
          <Route path="promotion" element={<ServicePromotion/>} />
          <Route path="notifications" element={<ServiceNotifications/>} />
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
        <ServiceContextProvider>
          <RouterStructure />
        </ServiceContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
