import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS,
  BACK_CUSTOMER,
  HARDWARE_BACK_CUSTOMER,
  DEFAULT_FETCH_SUCCESS,
  LOGGED_IN,
  DEFAULT_PHONE_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  phone: '',
  pin: '',
  selectedProvider: '',
  defaultEmail: '',
  defaultPassword: '',
  useAsCatalogue: '',
  signUpSwitch: true,
  loggedInEmail: '',
  loggedInPassword: '',
  defaultPhone: ''
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
    case LOGGED_IN:
      return { ...state,
        loggedInEmail: action.payload.email.toLowerCase(),
        loggedInPassword: action.payload.password
      };
    case DEFAULT_FETCH_SUCCESS:
      return { ...state,
        defaultEmail: action.payload.defaultEmail.toLowerCase(),
        defaultPassword: action.payload.defaultPassword,
        useAsCatalogue: action.payload.useAsCatalogue,
        signUpSwitch: action.payload.signUpSwitch,
        defaultPhone: action.payload.defaultPhone
      };
    case DEFAULT_PHONE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
