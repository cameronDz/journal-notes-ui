import { combineReducers } from "redux";
import articlesReducer from "../components/lists/articles/state/reducer";
import authReducer from "../auth/state/reducer";
import editorReducer from "../sections/editor/state/reducer";

export default combineReducers({
  articles: articlesReducer,
  auth: authReducer,
  editor: editorReducer,
});
