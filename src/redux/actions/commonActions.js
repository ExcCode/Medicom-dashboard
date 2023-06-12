import { useGetData } from "../../hooks/api/useGetData";
import { useInsertDataWithImage } from "../../hooks/api/useInsertData";
import {
  COUNTRIES_REQUEST,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAIL,
  CITIES_REQUEST,
  CITIES_SUCCESS,
  CITIES_FAIL,
  ATTCH_IMG_REQUEST,
  ATTCH_IMG_SUCCESS,
  ATTCH_IMG_FAIL,
} from "../types/commonTypes";

export const getCountries = () => async (dispatch) => {
  try {
    dispatch({
      type: COUNTRIES_REQUEST,
    });

    const res = await useGetData("/api/common/countries");
    dispatch({
      type: COUNTRIES_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: COUNTRIES_FAIL,
    });
  }
};

export const getCities = (country_id) => async (dispatch) => {
  try {
    dispatch({
      type: CITIES_REQUEST,
    });

    const res = await useGetData(`/api/common/cities?country_id=${country_id}`);
    dispatch({
      type: CITIES_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: CITIES_FAIL,
    });
  }
};

export const attachImg = (attachment) => async (dispatch) => {
  try {
    dispatch({
      type: ATTCH_IMG_REQUEST,
    });

    const res = await useInsertDataWithImage(
      "/api/common/attachment/store",
      attachment
    );
    dispatch({
      type: ATTCH_IMG_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: ATTCH_IMG_FAIL,
    });
  }
};
