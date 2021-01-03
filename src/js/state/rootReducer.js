import { combineReducers } from 'redux';
import articlesReducer from '../components/lists/articles/state/reducer';
import inputReducer from '../components/sections/input/state/reducer';

export default combineReducers({ articles: articlesReducer, input: inputReducer });
