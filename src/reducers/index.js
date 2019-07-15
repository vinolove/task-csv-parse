import { combineReducers } from 'redux';
import { addDataReducer } from './dashboard.reducer';

export const rootReducer = combineReducers({parsedData: addDataReducer})