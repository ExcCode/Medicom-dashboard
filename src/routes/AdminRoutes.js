import React, { lazy } from "react";
import { RequireAdmin } from "./RequireRoutes";

const AdminDashboard = lazy(() => import("../admin/components/dashboard"));
const AdminRegister = lazy(() => import("../admin/components/register"));
const AdminLogin = lazy(() => import("../admin/components/login"));
const AdminForgotPassword = lazy(() =>
  import("../admin/components/forgotpassword")
);
const AdminVerifiedCode = lazy(() =>
  import("../admin/components/forgotpassword/VerifiedCode")
);
const AdminChangePassword = lazy(() =>
  import("../admin/components/forgotpassword/ChangePassword")
);
const Medicals = lazy(() => import("../admin/components/medicals"));
const Doctors = lazy(() => import("../admin/components/doctors"));
const Patients = lazy(() => import("../admin/components/patients"));
const Specialities = lazy(() => import("../admin/components/specialities"));

const AdminRoutes = [
  {
    path: "/admin",
    component: (
      <RequireAdmin>
        <AdminDashboard />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/register",
    component: (
      <RequireAdmin>
        <AdminRegister />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/login",
    component: (
      <RequireAdmin>
        <AdminLogin />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/forgot-password",
    component: (
      <RequireAdmin>
        <AdminForgotPassword />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/verified-code",
    component: (
      <RequireAdmin>
        <AdminVerifiedCode />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/change-password",
    component: (
      <RequireAdmin>
        <AdminChangePassword />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/medicals",
    component: (
      <RequireAdmin>
        <Medicals />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/doctors",
    component: (
      <RequireAdmin>
        <Doctors />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/patients",
    component: (
      <RequireAdmin>
        <Patients />
      </RequireAdmin>
    ),
  },
  {
    path: "/admin/specialities",
    component: (
      <RequireAdmin>
        <Specialities />
      </RequireAdmin>
    ),
  },
];

export default AdminRoutes;
