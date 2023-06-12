import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  CREATE_DOCTOR_REQUEST,
  CREATE_DOCTOR_SUCCESS,
  CREATE_DOCTOR_FAIL,
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GET_SPECIFIC_DOCTOR_REQUEST,
  GET_SPECIFIC_DOCTOR_SUCCESS,
  GET_SPECIFIC_DOCTOR_FAIL,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAIL,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAIL,
} from "../../types/medical/doctorTypes";

export const createDoctor = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DOCTOR_REQUEST,
    });

    const res = await useInsertData("/api/medical/doctors/register", formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: CREATE_DOCTOR_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.doctorId?.shift() ||
          err?.response?.data?.message?.email?.shift() ||
          err?.response?.data?.message?.mobile?.shift() ||
          err?.response?.data?.message?.birthDate?.shift() ||
          err?.response?.data?.message?.startAt?.shift() ||
          err?.response?.data?.message?.endAt?.shift() ||
          err?.response?.data?.message?.specialIds?.shift() ||
          err?.response?.data?.message?.departmentIds?.shift() ||
          err?.response?.data?.message?.serviceIds?.shift() ||
          err?.response?.data?.message?.price?.shift() ||
          err?.data?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CREATE_DOCTOR_FAIL,
    });
  }
};

export const getDoctorsForMedical = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DOCTORS_REQUEST,
    });

    const res = await useGetData("/api/medical/doctors");
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

    const res = await useGetData(`/api/medical/doctors?doctorId=${id}`);
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

export const deleteDoctor = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DOCTOR_REQUEST,
    });

    const res = await useInsertData(`/api/medical/doctors/delete`, formData);
    res.code === 201 && notify(res.message, "success");
    console.log(res);
    dispatch({
      type: DELETE_DOCTOR_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    notify(
      err?.response?.data?.errors?.userName[0] ||
        err?.response?.data?.errors?.description[0] ||
        err?.data?.message,
      "error"
    );
    // dispatch if there error
    dispatch({
      type: DELETE_DOCTOR_FAIL,
    });
  }
};

export const updateDoctor = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DOCTOR_REQUEST,
    });

    const res = await useInsertData(`/api/medical/doctors/update`, formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: UPDATE_DOCTOR_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.doctorId?.shift() ||
          err?.response?.data?.message?.email?.shift() ||
          err?.response?.data?.message?.mobile?.shift() ||
          err?.response?.data?.message?.birthDate?.shift() ||
          err?.response?.data?.message?.startAt?.shift() ||
          err?.response?.data?.message?.endAt?.shift() ||
          err?.response?.data?.message?.specialIds?.shift() ||
          err?.response?.data?.message?.departmentIds?.shift() ||
          err?.response?.data?.message?.serviceIds?.shift() ||
          err?.response?.data?.message?.price?.shift() ||
          err?.data?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: UPDATE_DOCTOR_FAIL,
    });
  }
};

export const changeDoctorStatus = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_STATUS_REQUEST,
    });

    const res = await useInsertData(`/api/medical/doctors/updateStatus`, value);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: CHANGE_STATUS_SUCCESS,
      payload: res,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    // dispatch if there error
    dispatch({
      type: CHANGE_STATUS_FAIL,
    });
  }
};
