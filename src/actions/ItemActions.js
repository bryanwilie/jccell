import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  ITEM_UPDATE,
  ITEM_CREATE,
  ITEMS_FETCH_SUCCESS,
  ITEM_SAVE_SUCCESS,
  ITEM_DELETE,
  BACK_PAGE
} from './types';

export const itemUpdate = ({ prop, value }) => {
  return {
    type: ITEM_UPDATE,
    payload: { prop, value }
  };
};

export const itemCreate = ({ name, detail, size, price, code }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/items`)
      .push({ name, detail, size, price, code })
      .then(() => {
        dispatch({ type: ITEM_CREATE });
        Actions.itemList({ type: 'reset' });
      });
  };
};

export const itemsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/items`)
      .on('value', snapshot => {
        dispatch({ type: ITEMS_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const itemSave = ({ name, detail, size, price, code, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/items/${uid}`)
      .set({ name, detail, size, price, code })
      .then(() => {
        dispatch({ type: ITEM_SAVE_SUCCESS });
        Actions.itemList({ type: 'reset' });
      });
  };
};

export const itemDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/items/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: ITEM_DELETE });
        Actions.itemList({ type: 'reset' });
      });
  };
};

export const backPage = () => {
  return(dispatch) => {
    dispatch({ type: BACK_PAGE });
    Actions.itemList({ type: 'reset' });
  };
};
