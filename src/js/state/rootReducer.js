import { combineReducers } from "redux";
import authReducer from "../auth/state/reducer";
import editorReducer from "../sections/editor/state/reducer";
import notesReducer from "../sections/notes/state/reducer";

export default combineReducers({
  auth: authReducer,
  editor: editorReducer,
  notes: notesReducer,
});
