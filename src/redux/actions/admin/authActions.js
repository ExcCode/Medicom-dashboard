import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAIL,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  VERIFIED_CODE_REQUEST,
  VERIFIED_CODE_SUCCESS,
  VERIFIED_CODE_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../../types/admin/authTypes";

export const adminRegister = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_ADMIN_REQUEST,
    });

    const res = await useInsertData("/api/admin/register", formData);
    res.code === 201 && notify(res.message, "success");
    localStorage.setItem("user", JSON.stringify(res?.data));
    dispatch({
      type: REGISTER_ADMIN_SUCCESS,
      payload: res.data,
    });
    console.log(res);
    callback();
  } catch (err) {
    console.log(err);
    err && notify(err.response.data.message[0] || err?.message, "error");
    dispatch({
      type: REGISTER_ADMIN_FAIL,
    });
  }
};

export const adminLogin = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_ADMIN_REQUEST,
    });
    const res = await useInsertData("/api/admin/login", formData);
    res.code === 201 && notify(res.message, "success");
    localStorage.setItem("user", JSON.stringify(res?.data));
    dispatch({
      type: LOGIN_ADMIN_SUCCESS,
      payload: res.data,
    });
    console.log(res);
    callback();
  } catch (err) {
    console.log(err);
    err && notify(err?.response?.data?.message || err?.message, "error");
    dispatch({
      type: LOGIN_ADMIN_FAIL,
    });
  }
};

export const forgotPassword = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const res = await useInsertData("/api/admin/forgot_password", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(err?.response?.data?.message?.email[0] || err?.message, "error");
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

    const res = await useInsertData("/api/admin/check_verified_code", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: VERIFIED_CODE_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(err?.response?.data?.message?.email[0] || err?.message, "error");
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

    const res = await useInsertData("/api/admin/change_password", formData);
    res.code === 201 && notify(res.message, "success");
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.log(err);
    err &&
      notify(err?.response?.data?.message?.email[0] || err?.message, "error");
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: err?.response?.data.message || err?.message,
    });
  }
};
