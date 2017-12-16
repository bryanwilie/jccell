import {
  ITEM_UPDATE,
  ITEM_CREATE,
  ITEM_SAVE_SUCCESS,
  ITEM_DELETE,
  BACK_PAGE,
  SEND_SMS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  detail: '',
  size: '',
  price: '',
  code: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ITEM_CREATE:
      return INITIAL_STATE;
    case ITEM_SAVE_SUCCESS:
      return INITIAL_STATE;
    case ITEM_DELETE:
      return INITIAL_STATE;
    case BACK_PAGE:
      return INITIAL_STATE;
    case SEND_SMS_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
