import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  CREATE_MEDICAL_REQUEST,
  CREATE_MEDICAL_SUCCESS,
  CREATE_MEDICAL_FAIL,
  GET_MEDICALS_REQUEST,
  GET_MEDICALS_SUCCESS,
  GET_MEDICALS_FAIL,
  GET_SPECIFIC_MEDICAL_REQUEST,
  GET_SPECIFIC_MEDICAL_SUCCESS,
  GET_SPECIFIC_MEDICAL_FAIL,
  DELETE_MEDICAL_REQUEST,
  DELETE_MEDICAL_SUCCESS,
  DELETE_MEDICAL_FAIL,
  UPDATE_MEDICAL_REQUEST,
  UPDATE_MEDICAL_SUCCESS,
  UPDATE_MEDICAL_FAIL,
  APPROVE_MEDICAL_REQUEST,
  APPROVE_MEDICAL_SUCCESS,
  APPROVE_MEDICAL_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAIL,
} from "../../types/admin/medicalTypes";

export const createMedical = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MEDICAL_REQUEST,
    });

    const res = await useInsertData("/api/admin/medicals/store", formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: CREATE_MEDICAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message.specialIds[0] ||
          err?.response?.data?.message.departmentIds[0] ||
          err?.response?.data?.message.serviceIds[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CREATE_MEDICAL_FAIL,
    });
  }
};

export const getMedicalsForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEDICALS_REQUEST,
    });

    const res = await useGetData("/api/admin/medicals");
    dispatch({
      type: GET_MEDICALS_SUCCESS,
      payload: res,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_MEDICALS_FAIL,
    });
  }
};

export const getSpecificMedical = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_MEDICAL_REQUEST,
    });

    const res = await useGetData(`/api/admin/medicals/${id}`);
    dispatch({
      type: GET_SPECIFIC_MEDICAL_SUCCESS,
      payload: res.data[0],
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_SPECIFIC_MEDICAL_FAIL,
    });
  }
};

export const deleteMedical = (id, callback) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MEDICAL_REQUEST,
    });

    const res = await useInsertData(`/api/admin/medicals/deletee`, id);
    res.code === 201 && notify(res.message, "success");
    console.log(res);
    dispatch({
      type: DELETE_MEDICAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    notify(
      err?.response?.data?.message?.userName[0] ||
        err?.response?.data?.message?.description[0] ||
        err?.message,
      "error"
    );
    // dispatch if there error
    dispatch({
      type: DELETE_MEDICAL_FAIL,
    });
  }
};

export const updateMedical = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MEDICAL_REQUEST,
    });

    const res = await useInsertData(`/api/admin/medicals/update`, formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: UPDATE_MEDICAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.userName[0] ||
          err?.response?.data?.message?.description[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: UPDATE_MEDICAL_FAIL,
    });
  }
};

export const approveMedical = (value) => async (dispatch) => {
  try {
    dispatch({
      type: APPROVE_MEDICAL_REQUEST,
    });

    const res = await useInsertData(`/api/admin/medicals/approveStatus`, value);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: APPROVE_MEDICAL_SUCCESS,
      payload: res,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.approveStatus[0] ||
          err?.response?.data?.message?.medicalId[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: APPROVE_MEDICAL_FAIL,
    });
  }
};

export const changeMedicalStatus = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_STATUS_REQUEST,
    });

    const res = await useInsertData(`/api/admin/medicals/approveStatus`, value);
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
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CHANGE_STATUS_FAIL,
    });
  }
};
