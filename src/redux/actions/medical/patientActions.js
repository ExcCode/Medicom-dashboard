import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  SPECIFIC_PATIENT_REQUEST,
  SPECIFIC_PATIENT_SUCCESS,
  SPECIFIC_PATIENT_FAIL,
} from "../../types/medical/patientTypes";

export const getPatientsForMedical = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PATIENTS_REQUEST,
    });

    const res = await useGetData("/api/medical/patients");
    dispatch({
      type: GET_PATIENTS_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PATIENTS_FAIL,
    });
  }
};

export const getSpecificPatient = (patientId) => async (dispatch) => {
  try {
    dispatch({
      type: SPECIFIC_PATIENT_REQUEST,
    });

    const res = await useGetData(`/api/medical/patients/${patientId}`);
    dispatch({
      type: SPECIFIC_PATIENT_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: SPECIFIC_PATIENT_FAIL,
    });
  }
};
