import {
  REGISTER_MEDICAL_REQUEST,
  REGISTER_MEDICAL_SUCCESS,
  REGISTER_MEDICAL_FAIL,
  LOGIN_MEDICAL_REQUEST,
  LOGIN_MEDICAL_SUCCESS,
  LOGIN_MEDICAL_FAIL,
} from "../../types/medical/authTypes";

const initialState = {
  medicalData: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
};

function medicalAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_MEDICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_MEDICAL_SUCCESS:
      return {
        ...state,
        medicalData: action.payload,
        loading: false,
      };
    case REGISTER_MEDICAL_FAIL:
      return {
        ...state,
        loading: false,
      };

    case LOGIN_MEDICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_MEDICAL_SUCCESS:
      return {
        ...state,
        medicalData: action.payload,
        loading: false,
      };
    case LOGIN_MEDICAL_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export default medicalAuthReducers;
