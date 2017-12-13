import {
  ITEMS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEMS_FETCH_SUCCESS:
      // console.log(action); => returns an object
      // not using array, so we can selectively update current user ID as key, example below
      // return { ...state, [id]: action.payload };
      // shorter syntax than using array
      return action.payload;
    default:
      return state;
  }
};
