import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  // console.log(name, phone, shift);
  const { currentUser } = firebase.auth();
  //firebase.auth().currentUser will be currently authenticated user

  // returning some fat arrow function but not dispatching anything
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    // result :ES6: "/users/123456/employees"
    // get access to firebase database
    // make a referrence to users/userId/employees (path to our JSON data structure)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
    // .then(() => Actions.employeeList( type: 'reset' ))
  };
  // it will automatically updates our employee list! no need for action creator then, so we kinda trick the redux
  // just to pass the redux requirements
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  // reach out grab our list of employees in firebase and fetch them [ASYNC - redux thunk]
  return (dispatch) => {
    //previously we already making a ref to firebase
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      // on value is persistently watching for any values that come accross, not only if there're changes by the user, but all changes, any changes, in this apps lifecycle will be watched and reloaded
      .on('value', snapshot => {
        //anytime we get a data from ref, call this function with an object to describe the data that sit in here (snapshot)
        // an object we can use to handle all those employees
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
        // snapshot.val() is how we get access to the data in the .ref
        // snapshot is not the actual data
        // it is an object that describes the data that we could get access to
        // actual employees that are located there? Use snapshot.val()
        // snapshot is like a middle level data, is like what JSON is sitting at that point
        // snapshot gives lot of other fantastic data
      });
  };
};

// async action creator
export const employeeSave = ({ name, phone, shift, uid }) => {
  // uid is the real key to update a specific existing record in firebase
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
        // not going forward, but backward!!
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return() => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
