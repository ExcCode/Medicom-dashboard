import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../client/components/home"));
const PatientRegister = lazy(() =>
  import("../client/components/register/register")
);
const PatientLogin = lazy(() => import("../client/components/login/login"));
const PatientForgotPassword = lazy(() =>
  import("../client/components/forgot-password")
);

const Policy = lazy(() => import("../pages/policy"));
const Terms = lazy(() => import("../pages/terms"));

const GuestRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/pages/policy",
    component: <Policy />,
  },
  {
    path: "/pages/terms",
    component: <Terms />,
  },

  {
    path: "/patient/register",
    component: <PatientRegister />,
  },
  {
    path: "/patient/login",
    component: <PatientLogin />,
  },
  {
    path: "/patient/forgot-password",
    component: <PatientForgotPassword />,
  },
  // {
  //   path: "404",
  //   component: <PageNotFound />,
  // },
  // {
  //   path: "*",
  //   component: <Navigate to="/404" />,
  // },
];
export default GuestRoutes;
