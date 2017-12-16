import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native-openanything';
import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS,
  BACK_CUSTOMER,
  HARDWARE_BACK_CUSTOMER
} from './types';

export const customerFormUpdate = ({ prop, value }) => {
  return {
    type: CUSTOMER_FORM_UPDATE,
    payload: { prop, value }
  };
};

export const sendSms = ({ phone, pin, name, detail, size, price, code }) => {
  var message = (name) + '.' + (detail) + '.' + (size) + '.' + (phone) + '.' + (pin)

  return (dispatch) => {
    Text(phone, message)
    .then(() => {
      dispatch({
        type: SEND_SMS_SUCCESS,
        payload: { prop, value}
      });
    });
  };
};

export const backCustomer = () => {
  return(dispatch) => {
    dispatch({ type: BACK_CUSTOMER });
  };
};

export const hardwareBackCustomer = () => {
  return(dispatch) => {
    dispatch({ type: HARDWARE_BACK_CUSTOMER });
    Actions.providerList({ type: 'reset' });
  };
};
