import {
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GET_SPECIFIC_DOCTOR_REQUEST,
  GET_SPECIFIC_DOCTOR_SUCCESS,
  GET_SPECIFIC_DOCTOR_FAIL,
} from "../../types/admin/doctorTypes";

const initialState = {
  doctors: {},
  docDetails: "",
  loading: false,
};

function adminDoctorsReducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default adminDoctorsReducer;
