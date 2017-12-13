import {
  ITEM_UPDATE,
  ITEM_CREATE,
  ITEM_SAVE_SUCCESS,
  ITEM_DELETE,
  BACK_PAGE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  detail: '',
  size: '',
  price: '',
  code: ''
};

// below is boilerplate, can always copy this and it'll be always the exact same thing
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
      // [] not array, but interpellation
      // the key that we're adding right here will be determined at runtime
      // without ES6:
      // const newState = {};
      // newState[action.payload.prop] = action.payload.value
    case ITEM_CREATE:
      return INITIAL_STATE;
    case ITEM_SAVE_SUCCESS:
      return INITIAL_STATE;
    case ITEM_DELETE:
      return INITIAL_STATE;
    case BACK_PAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
