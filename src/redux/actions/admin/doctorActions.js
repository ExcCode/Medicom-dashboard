import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GET_SPECIFIC_DOCTOR_REQUEST,
  GET_SPECIFIC_DOCTOR_SUCCESS,
  GET_SPECIFIC_DOCTOR_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAIL,
} from "../../types/admin/doctorTypes";

export const getDoctorsForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DOCTORS_REQUEST,
    });

    const res = await useGetData("/api/admin/doctors");
    dispatch({
      type: GET_DOCTORS_SUCCESS,
      payload: res,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_DOCTORS_FAIL,
    });
  }
};

export const getSpecificDoctor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_DOCTOR_REQUEST,
    });

    const res = await useGetData(`/api/admin/doctors?doctorId=${id}`);
    dispatch({
      type: GET_SPECIFIC_DOCTOR_SUCCESS,
      payload: res.data[0],
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_SPECIFIC_DOCTOR_FAIL,
    });
  }
};

export const changeDoctorStatus = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_STATUS_REQUEST,
    });

    const res = await useInsertData(`/api/admin/doctors/updateStatus`, value);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: CHANGE_STATUS_SUCCESS,
      payload: res,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.status[0] ||
          err?.response?.data?.message?.medicalId[0] ||
          err?.data?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CHANGE_STATUS_FAIL,
    });
  }
};
