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
} from "../../types/admin/medicalTypes";

const initialState = {
  medicals: [],
  medDetails: "",
  loading: false,
};

function medicalReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MEDICAL_REQUEST:
      return { ...state, loading: true };
    case CREATE_MEDICAL_SUCCESS:
      return { ...state, medicals: action.payload, loading: false };
    case CREATE_MEDICAL_FAIL:
      return { ...state, loading: false };

    case GET_MEDICALS_REQUEST:
      return { ...state, loading: true };
    case GET_MEDICALS_SUCCESS:
      return { ...state, medicals: action.payload, loading: false };
    case GET_MEDICALS_FAIL:
      return { ...state, loading: false };

    case GET_SPECIFIC_MEDICAL_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIFIC_MEDICAL_SUCCESS:
      return { ...state, medDetails: action.payload, loading: false };
    case GET_SPECIFIC_MEDICAL_FAIL:
      return { ...state, loading: false };

    case DELETE_MEDICAL_REQUEST:
      return { ...state, loading: true };
    case DELETE_MEDICAL_SUCCESS:
      return { ...state, medicals: action.payload, loading: false };
    case DELETE_MEDICAL_FAIL:
      return { ...state, loading: false };

    case UPDATE_MEDICAL_REQUEST:
      return { ...state, loading: true };
    case UPDATE_MEDICAL_SUCCESS:
      return { ...state, medicals: action.payload, loading: false };
    case UPDATE_MEDICAL_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default medicalReducer;
