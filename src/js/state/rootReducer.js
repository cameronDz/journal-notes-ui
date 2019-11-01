import { combineReducers } from 'redux';
import articlesReducer from '../components/lists/articles/state/reducer';

export default combineReducers({ articles: articlesReducer });
