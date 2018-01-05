import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SKIP_USER,
  LOGGED_IN
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const setSignUp = (value) => {
  return () => {
    firebase.database().ref(`/defaultAccount`)
      .update({
        signUpSwitch: value })
  };
};

export const loginUser = ({ email, password, useAsCatalogue, allowSignUp, skip }) => {

  return(dispatch) => {
    if(skip){
      if(useAsCatalogue){
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, skip))
          .catch((error) => {
            console.log('Email and Password stored as default cant be logged in');
            loginUserFail(dispatch, "Catalogue Not Available");
            });
        dispatch({type: SKIP_USER });
      } else {
        console.log('useAsCatalogue false');
        loginUserFail(dispatch, "Catalogue Not Available");
      }

    } else if (!(skip)) {
      if(allowSignUp){
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            loginUserSuccess(dispatch, user, skip);
            dispatch({type: LOGGED_IN, payload: {email, password} });
            })
          .catch((error) => {
            console.log(error);
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(user => {
                loginUserSuccess(dispatch, user, skip);
                dispatch({type: LOGGED_IN, payload: {email, password} });
                })
              .catch((error) => {
                console.log(error);
                if (error.code == "auth/weak-password") {
                  loginUserFail(dispatch, error.message);
                } else {
                  loginUserFail(dispatch, "Authentication Failed");
                }
              });
            });
        dispatch({type: LOGIN_USER });
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            loginUserSuccess(dispatch, user, skip);
            dispatch({type: LOGGED_IN, payload: {email, password} });
            })
          .catch((error) => {
            console.log(error);
            if (error.code == "auth/weak-password") {
              loginUserFail(dispatch, error.message);
            } else {
              loginUserFail(dispatch, "Authentication Failed");
            }
          });
        dispatch({type: LOGIN_USER });
      }

    }
  };
};

const loginUserFail = (dispatch, message) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: message});
};

const loginUserSuccess = (dispatch, user, skip) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  if (!(skip)) {
    Actions.manager();
  } else if (skip) {
    Actions.main();
  }
};
