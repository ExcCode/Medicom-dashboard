import React, { lazy } from "react";
import { RequireMedical } from "./RequireRoutes";

const MedicalDashboard = lazy(() => import("../medical/components/dashboard"));
const MedicalRegister = lazy(() => import("../medical/components/register"));
const MedicalLogin = lazy(() => import("../medical/components/login"));
const MedicalForgotPassword = lazy(() =>
  import("../medical/components/forgotpassword")
);
const MedicalVerifiedCode = lazy(() =>
  import("../medical/components/forgotpassword/VerifiedCode")
);
const MedicalChangePassword = lazy(() =>
  import("../medical/components/forgotpassword/ChangePassword")
);
const Doctors = lazy(() => import("../medical/components/doctors"));
const Patients = lazy(() => import("../medical/components/patients"));
const Deparments = lazy(() => import("../medical/components/departments"));
const Services = lazy(() => import("../medical/components/services"));

const MedicalRoutes = [
  {
    path: "/medical",
    component: (
      <RequireMedical>
        <MedicalDashboard />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/register",
    component: (
      <RequireMedical>
        <MedicalRegister />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/login",
    component: (
      <RequireMedical>
        <MedicalLogin />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/forgot-password",
    component: (
      <RequireMedical>
        <MedicalForgotPassword />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/verified-code",
    component: (
      <RequireMedical>
        <MedicalVerifiedCode />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/change-password",
    component: (
      <RequireMedical>
        <MedicalChangePassword />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/doctors",
    component: (
      <RequireMedical>
        <Doctors />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/patients",
    component: (
      <RequireMedical>
        <Patients />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/deparments",
    component: (
      <RequireMedical>
        <Deparments />
      </RequireMedical>
    ),
  },
  {
    path: "/medical/services",
    component: (
      <RequireMedical>
        <Services />
      </RequireMedical>
    ),
  },
];

export default MedicalRoutes;
