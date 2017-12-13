import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
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

export const loginUser = ({ email, password }) => {
  return(dispatch) => { // some asynchronous action is gonna happened here
    // can't immediately return an action! call dispatch to dispatch!

    // show a spinner first
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      //.then(user => {
        // so we're not calling dispatch until the firebase request is complete
      //dispatch({ type: LOGIN_USER_SUCCESS, payload:user });
        // manually passed off to dispatch
        // ==> this writing style is too messy, create a HELPER FUNCTION (loginUserSuccess) for that purpose
      //});
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        //console.log(error); =>> expect to see banana

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
  // action creator is now returning a function
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
