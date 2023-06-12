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

const initialState = {
  departments: {},
  departDetails: "",
  loading: false,
};

function departmentReducers(state = initialState, action) {
  switch (action.type) {
    case CREATE_DEPARTMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_DEPARTMENT_SUCCESS:
      return { ...state, departments: action.payload, loading: false };
    case CREATE_DEPARTMENT_FAIL:
      return { ...state, loading: false };

    case GET_DEPARTMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_DEPARTMENTS_SUCCESS:
      return { ...state, departments: action.payload, loading: false };
    case GET_DEPARTMENTS_FAIL:
      return { ...state, loading: false };

    case GET_SPECIFIC_DEPARTMENT_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIFIC_DEPARTMENT_SUCCESS:
      return { ...state, departDetails: action.payload, loading: false };
    case GET_SPECIFIC_DEPARTMENT_FAIL:
      return { ...state, loading: false };

    case DELETE_DEPARTMENT_REQUEST:
      return { ...state, loading: true };
    case DELETE_DEPARTMENT_SUCCESS:
      return { ...state, departments: action.payload, loading: false };
    case DELETE_DEPARTMENT_FAIL:
      return { ...state, loading: false };

    case UPDATE_DEPARTMENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_DEPARTMENT_SUCCESS:
      return { ...state, departments: action.payload, loading: false };
    case UPDATE_DEPARTMENT_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default departmentReducers;
