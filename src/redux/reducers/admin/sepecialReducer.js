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

const initialState = {
  specialities: [],
  specDetails: "",
  loading: false,
};

function sepecialReducers(state = initialState, action) {
  switch (action.type) {
    case CREATE_SPECIAL_REQUEST:
      return { ...state, loading: true };
    case CREATE_SPECIAL_SUCCESS:
      return { ...state, specialities: action.payload, loading: false };
    case CREATE_SPECIAL_FAIL:
      return { ...state, loading: false };

    case GET_SPECIALITIES_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIALITIES_SUCCESS:
      return { ...state, specialities: action.payload, loading: false };
    case GET_SPECIALITIES_FAIL:
      return { ...state, loading: false };

    case GET_SPECIFIC_SPECIAL_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIFIC_SPECIAL_SUCCESS:
      return { ...state, specDetails: action.payload, loading: false };
    case GET_SPECIFIC_SPECIAL_FAIL:
      return { ...state, loading: false };

    case DELETE_SPECIAL_REQUEST:
      return { ...state, loading: true };
    case DELETE_SPECIAL_SUCCESS:
      return { ...state, specialities: action.payload, loading: false };
    case DELETE_SPECIAL_FAIL:
      return { ...state, loading: false };

    case UPDATE_SPECIAL_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SPECIAL_SUCCESS:
      return { ...state, specialities: action.payload, loading: false };
    case UPDATE_SPECIAL_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default sepecialReducers;
