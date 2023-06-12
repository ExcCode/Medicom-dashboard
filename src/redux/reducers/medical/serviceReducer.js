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

const initialState = {
  services: {},
  servDetails: "",
  loading: false,
};

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SERVICE_REQUEST:
      return { ...state, loading: true };
    case CREATE_SERVICE_SUCCESS:
      return { ...state, services: action.payload, loading: false };
    case CREATE_SERVICE_FAIL:
      return { ...state, loading: false };

    case GET_SERVICES_REQUEST:
      return { ...state, loading: true };
    case GET_SERVICES_SUCCESS:
      return { ...state, services: action.payload, loading: false };
    case GET_SERVICES_FAIL:
      return { ...state, loading: false };

    case GET_SPECIFIC_SERVICE_REQUEST:
      return { ...state, loading: true };
    case GET_SPECIFIC_SERVICE_SUCCESS:
      return { ...state, servDetails: action.payload, loading: false };
    case GET_SPECIFIC_SERVICE_FAIL:
      return { ...state, loading: false };

    case DELETE_SERVICE_REQUEST:
      return { ...state, loading: true };
    case DELETE_SERVICE_SUCCESS:
      return { ...state, services: action.payload, loading: false };
    case DELETE_SERVICE_FAIL:
      return { ...state, loading: false };

    case UPDATE_SERVICE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SERVICE_SUCCESS:
      return { ...state, services: action.payload, loading: false };
    case UPDATE_SERVICE_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default serviceReducer;
