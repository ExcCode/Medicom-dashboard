import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAIL,
  GET_SPECIFIC_SERVICE_REQUEST,
  GET_SPECIFIC_SERVICE_SUCCESS,
  GET_SPECIFIC_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
} from "../../types/medical/serviceTypes";

export const createService = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SERVICE_REQUEST,
    });

    const res = await useInsertData("/api/medical/services/store", formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: CREATE_SERVICE_SUCCESS,
      payload: res?.data,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.name[0] ||
          err?.response?.data?.message?.description[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: CREATE_SERVICE_FAIL,
    });
  }
};

export const getServices =
  (page = "", size = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICES_REQUEST,
      });

      const res = await useGetData(
        `/api/medical/services?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_SERVICES_SUCCESS,
        payload: res,
      });
      console.log(res);
    } catch (err) {
      dispatch({
        type: GET_SERVICES_FAIL,
      });
    }
  };

export const getSpecificService = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_SERVICE_REQUEST,
    });

    const res = await useGetData(`/api/medical/services?serviceId=${id}`);
    dispatch({
      type: GET_SPECIFIC_SERVICE_SUCCESS,
      payload: res.data[0],
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_SPECIFIC_SERVICE_FAIL,
    });
  }
};

export const deleteService = (id, callback) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SERVICE_REQUEST,
    });

    const res = await useInsertData(`/api/medical/services/delete`, id);
    res.code === 201 && notify(res.message, "success");
    console.log(res);
    dispatch({
      type: DELETE_SERVICE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    notify(
      err?.response?.data?.message?.name[0] ||
        err?.response?.data?.message?.description[0] ||
        err?.message,
      "error"
    );
    // dispatch if there error
    dispatch({
      type: DELETE_SERVICE_FAIL,
    });
  }
};

export const updateService = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SERVICE_REQUEST,
    });

    const res = await useInsertData(`/api/medical/services/update`, formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: UPDATE_SERVICE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    err &&
      notify(
        err?.response?.data?.message?.name[0] ||
          err?.response?.data?.message?.description[0] ||
          err?.message,
        "error"
      );
    // dispatch if there error
    dispatch({
      type: UPDATE_SERVICE_FAIL,
    });
  }
};
