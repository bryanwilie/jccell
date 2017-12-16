import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS,
  BACK_CUSTOMER,
  HARDWARE_BACK_CUSTOMER
} from '../actions/types';

const INITIAL_STATE = {
  phone: '',
  pin: '',
  selectedProvider: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SEND_SMS_SUCCESS:
      return INITIAL_STATE;
    case BACK_CUSTOMER:
      return { ...state, phone: '', pin: ''};
    case HARDWARE_BACK_CUSTOMER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
