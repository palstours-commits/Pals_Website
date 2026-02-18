import { combineReducers } from "redux";
import menuReducer from "./slice/menuSlice";
import submenuReducer from "./slice/submenuSlice";
import contactReducer from "./slice/contactSlice";
import packagesReducer from "./slice/packagesSlice";
import enquiryReducer from "./slice/enquirySlice";
const reducer = combineReducers({
  menu: menuReducer,
  submenu: submenuReducer,
  contact: contactReducer,
  packages: packagesReducer,
  enquiry: enquiryReducer,
});
export default reducer;
