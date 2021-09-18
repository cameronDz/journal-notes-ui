import { combineReducers } from "redux";
import articlesReducer from "../components/lists/articles/state/reducer";
import authReducer from "../auth/state/reducer";
import inputReducer from "../components/sections/input/state/reducer";

export default combineReducers({
  articles: articlesReducer,
  auth: authReducer,
  input: inputReducer,
});
