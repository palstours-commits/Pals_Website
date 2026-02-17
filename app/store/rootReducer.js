import { combineReducers } from "redux";
import menuReducer from "./slice/menuSlice";
import submenuReducer from "./slice/submenuSlice";
const reducer = combineReducers({
  menu: menuReducer,
  submenu: submenuReducer,
});
export default reducer;
