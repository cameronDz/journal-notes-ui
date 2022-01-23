import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import editorReducer from "./editor/reducer";
import notesReducer from "./notes/reducer";

export default combineReducers({
  auth: authReducer,
  editor: editorReducer,
  notes: notesReducer,
});
