import { combineReducers } from "redux";
import adminAuthReducer from "./admin/authReducer";
import medicalAuthReducer from "./medical/authReducer";
import commonReducer from "./commonReducer";
import sepecialReducer from "./admin/sepecialReducer";
import departmentReducer from "./medical/departmentReducer";
import serviceReducer from "./medical/serviceReducer";
import medicalReducer from "./admin/medicalReducer";
import doctorsReducer from "./medical/doctorsReducer";
import adminDoctorsReducer from "./admin/adminDoctorsReducer";

const reducers = combineReducers({
  admin: adminAuthReducer,
  medical: medicalAuthReducer,
  common: commonReducer,
  sepecialReducer: sepecialReducer,
  departmentReducer: departmentReducer,
  serviceReducer: serviceReducer,
  adminMedical: medicalReducer,
  medicalDoctors: doctorsReducer,
  adminDoctors: adminDoctorsReducer,
});

export default reducers;
