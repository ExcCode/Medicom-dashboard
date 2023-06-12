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

const initialState = {
  countries: [],
  cities: [],
  selectedImg: {},
  loading: false,
};

function commonReducers(state = initialState, action) {
  switch (action.type) {
    case COUNTRIES_REQUEST:
      return { ...state, loading: true };
    case COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload, loading: false };
    case COUNTRIES_FAIL:
      return { ...state, loading: false };

    case CITIES_REQUEST:
      return { ...state, loading: true };
    case CITIES_SUCCESS:
      return { ...state, cities: action.payload, loading: false };
    case CITIES_FAIL:
      return { ...state, loading: false };

    case ATTCH_IMG_REQUEST:
      return { ...state, loading: true };
    case ATTCH_IMG_SUCCESS:
      return { ...state, selectedImg: action.payload, loading: false };
    case ATTCH_IMG_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default commonReducers;
