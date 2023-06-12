import {
  CREATE_DOCTOR_REQUEST,
  CREATE_DOCTOR_SUCCESS,
  CREATE_DOCTOR_FAIL,
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GET_SPECIFIC_DOCTOR_REQUEST,
  GET_SPECIFIC_DOCTOR_SUCCESS,
  GET_SPECIFIC_DOCTOR_FAIL,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAIL,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_FAIL,
} from "../../types/medical/doctorTypes";

const initialState = {
  doctors: {},
  docDetails: "",
  loading: false,
};

function doctorsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case CREATE_DOCTOR_SUCCESS:
      return { ...state, doctors: action.payload, loading: false };
    case CREATE_DOCTOR_FAIL:
      return { ...state, loading: false };

    case GET_DOCTORS_REQUEST:
      return { ...state, loading: true };
    case GET_DOCTORS_SUCCESS:
      return { ...state, doctors: action.payload, loading: false };
    case GET_DOCTORS_FAIL:
      return { ...state, loading: false };

    case GET_SPECIFIC_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIFIC_DOCTOR_SUCCESS:
      return { ...state, docDetails: action.payload, loading: false };
    case GET_SPECIFIC_DOCTOR_FAIL:
      return { ...state, loading: false };

    case DELETE_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case DELETE_DOCTOR_SUCCESS:
      return { ...state, doctors: action.payload, loading: false };
    case DELETE_DOCTOR_FAIL:
      return { ...state, loading: false };

    case UPDATE_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case UPDATE_DOCTOR_SUCCESS:
      return { ...state, doctors: action.payload, loading: false };
    case UPDATE_DOCTOR_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default doctorsReducer;
