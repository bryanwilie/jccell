// handle everything about auth in apps!

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};
// this is not really necessary because it's okay to run initial state with undefined, but it's more for the programmers to see that this reducer is responsible for email and password
// this is like initial state in previous example withh state is not using redux, the email is defaulted with empty string

export default (state = INITIAL_STATE, action) => {
  // console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
      // {}         means make a BRAND NEW object
      // ...state   means take all of the properties off my existing state obj
                        //and throw them into that BRAND NEW object
      // email:     means define the property email, given the value of action.payload
                        //and toss it on top of whatever properties were on that BRAND NEW state object, overwriting the prev content of BRAND NEW state object
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // banana; =>> authentication failed
      return { ...state, ...INITIAL_STATE, user: action.payload };
        // instead of saying error: '', loading: false, email: '', password: '', it's the same like resetting them all
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};
