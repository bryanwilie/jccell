import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; //middleware
import reducers from  './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBYtKPzYsBa14Ka-nGVxzsvoI-r6aYasdM",
      authDomain: "jccell-8936d.firebaseapp.com",
      databaseURL: "https://jccell-8936d.firebaseio.com",
      projectId: "jccell-8936d",
      storageBucket: "jccell-8936d.appspot.com",
      messagingSenderId: "785782397510"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // second argument is for any initial state that we want to pass to our redux app
    // optional, server side renderring
    // third argument => store enhancer, adding additional func to the store
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
