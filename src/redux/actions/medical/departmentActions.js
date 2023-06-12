import { useGetData } from "../../../hooks/api/useGetData";
import { useInsertData } from "../../../hooks/api/useInsertData";
import { notify } from "../../../hooks/notify/useNotification";
import {
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAIL,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAIL,
  GET_SPECIFIC_DEPARTMENT_REQUEST,
  GET_SPECIFIC_DEPARTMENT_SUCCESS,
  GET_SPECIFIC_DEPARTMENT_FAIL,
  DELETE_DEPARTMENT_REQUEST,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
} from "../../types/medical/departmentTypes";

export const createDepartment = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DEPARTMENT_REQUEST,
    });

    const res = await useInsertData("/api/medical/departments/store", formData);
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: CREATE_DEPARTMENT_SUCCESS,
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
      type: CREATE_DEPARTMENT_FAIL,
    });
  }
};

export const getDepartments =
  (page = "", size = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_DEPARTMENTS_REQUEST,
      });

      const res = await useGetData(
        `/api/medical/departments?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_DEPARTMENTS_SUCCESS,
        payload: res,
      });
      console.log(res);
    } catch (err) {
      dispatch({
        type: GET_DEPARTMENTS_FAIL,
      });
    }
  };

export const getSpecificDepartment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_DEPARTMENT_REQUEST,
    });

    const res = await useGetData(`/api/medical/departments?departmentId=${id}`);
    dispatch({
      type: GET_SPECIFIC_DEPARTMENT_SUCCESS,
      payload: res.data[0],
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_SPECIFIC_DEPARTMENT_FAIL,
    });
  }
};

export const deleteDepartment = (id, callback) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({
      type: DELETE_DEPARTMENT_REQUEST,
    });

    const res = await useInsertData(`/api/medical/departments/delete`, id);
    res.code === 201 && notify(res.message, "success");
    console.log(res);
    dispatch({
      type: DELETE_DEPARTMENT_SUCCESS,
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
      type: DELETE_DEPARTMENT_FAIL,
      payload: err?.response?.data?.message || err?.message,
    });
  }
};

export const updateDepartment = (formData, callback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DEPARTMENT_REQUEST,
    });

    const res = await useInsertData(
      `/api/medical/departments/update`,
      formData
    );
    res.code === 201 && notify(res.message, "success");
    // dispatch for data api
    console.log(res);
    dispatch({
      type: UPDATE_DEPARTMENT_SUCCESS,
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
      type: UPDATE_DEPARTMENT_FAIL,
    });
  }
};
