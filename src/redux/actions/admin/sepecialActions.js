import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  CREATE_SPECIAL_REQUEST,
  CREATE_SPECIAL_SUCCESS,
  CREATE_SPECIAL_FAIL,
  GET_SPECIALITIES_REQUEST,
  GET_SPECIALITIES_SUCCESS,
  GET_SPECIALITIES_FAIL,
  GET_SPECIFIC_SPECIAL_REQUEST,
  GET_SPECIFIC_SPECIAL_SUCCESS,
  GET_SPECIFIC_SPECIAL_FAIL,
  DELETE_SPECIAL_REQUEST,
  DELETE_SPECIAL_SUCCESS,
  DELETE_SPECIAL_FAIL,
  UPDATE_SPECIAL_REQUEST,
  UPDATE_SPECIAL_SUCCESS,
  UPDATE_SPECIAL_FAIL,
} from "../../types/admin/specialTypes";

export const createSpecial = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SPECIAL_REQUEST,
    });

    const res = await useInsertData("/api/admin/specialities/store", formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: CREATE_SPECIAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.nameAr[0] ||
          err?.response?.data?.message?.nameEn[0] ||
          err?.response?.data?.message?.attachmentId[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CREATE_SPECIAL_FAIL,
    });
  }
};

export const getSpecialities =
  (page = "", size = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SPECIALITIES_REQUEST,
      });

      const res = await useGetData(
        `/api/common/specialization?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_SPECIALITIES_SUCCESS,
        payload: res,
      });
      console.log(res);
    } catch (err) {
      dispatch({
        type: GET_SPECIALITIES_FAIL,
      });
    }
  };

export const getSpecificSpecial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_SPECIAL_REQUEST,
    });

    const res = await useGetData(
      `/api/common/specialization?specializedId=${id}`
    );
    dispatch({
      type: GET_SPECIFIC_SPECIAL_SUCCESS,
      payload: res.data[0],
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_SPECIFIC_SPECIAL_FAIL,
    });
  }
};

export const deleteSpecial = (id, callback) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SPECIAL_REQUEST,
    });

    const res = await useInsertData(`/api/admin/specialities/delete`, id);
    res.code === 201 && notify(res.message, "success");
    console.log(res);
    dispatch({
      type: DELETE_SPECIAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    notify(err?.response?.data?.message.specialId[0] || err?.message, "error");
    // dispatch if there error
    dispatch({
      type: DELETE_SPECIAL_FAIL,
      payload: err?.response?.data?.message || err?.message,
    });
  }
};

export const updateSpecial = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SPECIAL_REQUEST,
    });

    const res = await useInsertData(`/api/admin/specialities/update`, formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: UPDATE_SPECIAL_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message.nameAr[0] ||
          err?.response?.data?.message.nameEn[0] ||
          err?.response?.data?.message.attachmentId[0] ||
          err.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: UPDATE_SPECIAL_FAIL,
    });
  }
};
