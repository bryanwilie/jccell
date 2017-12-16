import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native-openanything';
import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS
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
