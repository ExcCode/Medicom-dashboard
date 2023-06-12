import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers/rootReducers";
import { composeWithDevTools } from "@redux-devtools/extension";

const initialValue = {};

export const store = legacy_createStore(
  rootReducers,
  initialValue,
  composeWithDevTools(applyMiddleware(thunk))
);
