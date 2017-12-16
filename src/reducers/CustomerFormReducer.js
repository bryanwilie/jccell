import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  phone: '',
  pin: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SEND_SMS_SUCCESS:
      return INTIAL_STATE;
    default:
      return state;
  }
};
