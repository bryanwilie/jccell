import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ItemFormReducer from './ItemFormReducer';
import ItemReducer from './ItemReducer';

export default combineReducers({
  auth: AuthReducer,
  itemForm: ItemFormReducer,
  items: ItemReducer
});
