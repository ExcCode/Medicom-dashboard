import patientRoutes from "./patientRoutes";
import AdminRoutes from "./AdminRoutes";
import MedicalRoutes from "./MedicalRoutes";

const RootRoutes = {
  routes: [...patientRoutes, ...AdminRoutes, ...MedicalRoutes],
};

export default RootRoutes;
