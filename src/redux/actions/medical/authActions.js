import { useInsertData } from "../../../hooks/api/useInsertData";
import { useGetData } from "../../../hooks/api/useGetData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  REGISTER_MEDICAL_REQUEST,
  REGISTER_MEDICAL_SUCCESS,
  REGISTER_MEDICAL_FAIL,
  LOGIN_MEDICAL_REQUEST,
  LOGIN_MEDICAL_SUCCESS,
  LOGIN_MEDICAL_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  VERIFIED_CODE_REQUEST,
  VERIFIED_CODE_SUCCESS,
  VERIFIED_CODE_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from "../../types/medical/authTypes";

export const medicalRegister = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_MEDICAL_REQUEST,
    });

    const res = await useInsertData("/api/medical/register", formData);
    res.code === 201 && notify(res.message, "success");
    localStorage.setItem("user", JSON.stringify(res?.data));
    dispatch({
      type: REGISTER_MEDICAL_SUCCESS,
      payload: res.data,
    });
    callback();
    console.log(res);
  } catch (err) {
    console.log(err);
    err && notify(err.response.data.message || err?.message, "error");
    dispatch({
      type: REGISTER_MEDICAL_FAIL,
    });
  }
};

export const medicalLogin = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_MEDICAL_REQUEST,
    });

    const res = await useInsertData("/api/medical/login", formData);
    res.code === 201 && notify(res.message, "success");
    localStorage.setItem("user", JSON.stringify(res?.data));
    dispatch({
      type: LOGIN_MEDICAL_SUCCESS,
      payload: res?.data,
    });
    console.log(res);
    callback();
  } catch (err) {
    console.log(err);
    err && notify(err.response.data.message || err?.message, "error");
    dispatch({
      type: LOGIN_MEDICAL_FAIL,
      payload: err?.data?.message.mobile[0] || err?.message,
    });
  }
};

export const forgotPassword = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const res = await useInsertData("/api/medical/send_code", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(err?.response?.data?.message?.mobile[0] || err?.message, "error");
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: err?.response?.data.message || err?.message,
    });
  }
};

export const verifiedCode = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFIED_CODE_REQUEST,
    });

    const res = await useInsertData("/api/medical/verify_code", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: VERIFIED_CODE_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(err?.response?.data?.message?.code[0] || err?.message, "error");
    dispatch({
      type: VERIFIED_CODE_FAIL,
      payload: err?.response?.data.message || err?.message,
    });
  }
};

export const changePassword = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });

    const res = await useInsertData("/api/medical/change_password", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.new_password[0] || err?.message,
        "error"
      );
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: err?.response?.data.message || err?.message,
    });
  }
};

export const getProfileForMedical = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const res = await useGetData("/api/medical/profile");
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PROFILE_FAIL,
    });
  }
};
