import {
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAIL,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
} from "../../types/admin/authTypes";

const initialState = {
  adminData: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
};

function adminAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
        adminData: action.payload,
        loading: false,
      };
    case REGISTER_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case LOGIN_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        adminData: action.payload,
        loading: false,
      };
    case LOGIN_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export default adminAuthReducers;
