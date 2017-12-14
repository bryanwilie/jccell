import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ItemFormReducer from './ItemFormReducer';
import ItemReducer from './ItemReducer';
import CustomerFormRecuder from './CustomerFormReducer';

export default combineReducers({
  auth: AuthReducer,
  itemForm: ItemFormReducer,
  items: ItemReducer,
  customerForm: CustomerFormRecuder
});
