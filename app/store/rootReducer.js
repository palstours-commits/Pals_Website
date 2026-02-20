import { combineReducers } from "redux";
import menuReducer from "./slice/menuSlice";
import submenuReducer from "./slice/submenuSlice";
import contactReducer from "./slice/contactSlice";
import packagesReducer from "./slice/packageSlice";
import enquiryReducer from "./slice/enquirySlice";
import serviceReducer from "./slice/serviceFormSlice";
import zonesReducer from "./slice/zoneSlice";
const reducer = combineReducers({
  menu: menuReducer,
  submenu: submenuReducer,
  contact: contactReducer,
  packages: packagesReducer,
  enquiry: enquiryReducer,
  service: serviceReducer,
  zones: zonesReducer,
});
export default reducer;
