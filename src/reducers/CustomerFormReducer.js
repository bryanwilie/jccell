import {
  CUSTOMER_FORM_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  phone: '',
  pin: ''
};

// below is boilerplate, can always copy this and it'll be always the exact same thing
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
