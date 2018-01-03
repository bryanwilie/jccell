import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native-openanything';
import SmsAndroid from 'react-native-sms-android';
import {
  CUSTOMER_FORM_UPDATE,
  SEND_SMS_SUCCESS,
  BACK_CUSTOMER,
  HARDWARE_BACK_CUSTOMER,
  DEFAULT_FETCH_SUCCESS,
  SET_DEFAULT_SUCCESS,
  DEFAULT_PHONE_UPDATE
} from './types';

export const defaultAccountFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/defaultAccount`)
      .on('value', snapshot => {
        dispatch({ type: DEFAULT_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const setDefaultSuccess = ({value, loggedInEmail, loggedInPassword}) => {
  return () => {
    if (value) {
      firebase.database().ref(`/defaultAccount`)
        .update({
          defaultEmail: loggedInEmail,
          defaultPassword: loggedInPassword,
          useAsCatalogue: value
        })
    } else {
      firebase.database().ref(`/defaultAccount`)
        .update({
          defaultEmail: 'a',
          defaultPassword: 'a',
          useAsCatalogue: value
        })
    }
  };
};

export const customerFormUpdate = ({ prop, value }) => {
  return(dispatch) => {
    dispatch({
      type: CUSTOMER_FORM_UPDATE,
      payload: { prop, value }
    });
  };
};

export const ownerPhoneUpdate = ({ prop, value }) => {
  return(dispatch) => {
    dispatch({
      type: DEFAULT_PHONE_UPDATE,
      payload: { prop, value }
    });
  };
};

export const defaultOwnerPhoneUpdate = (defaultPhone) => {
  return() => {
    firebase.database().ref(`/defaultAccount`)
      .update({
        defaultPhone
      });
  };
};

export const sendSms = ({ defaultPhone, phone, pin, name, detail, size, price, code }) => {
  var message = (name) + '.' + (detail) + '.' + (size) + '.' + (phone) + '.' + (pin)

  return() => {
    SmsAndroid.sms(
      defaultPhone,
      message,
      'sendDirect',
      (err, message) => {
        if (err) {
          console.log("error");
        } else {
          console.log(message);
        }
      }
    );
  };
};

export const backCustomer = () => {
  return(dispatch) => {
    dispatch({
      type: BACK_CUSTOMER
    });
  };
};

export const hardwareBackCustomer = () => {
  return(dispatch) => {
    dispatch({ type: HARDWARE_BACK_CUSTOMER });
    Actions.providerList({ type: 'reset' });
  };
};
