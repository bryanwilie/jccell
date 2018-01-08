import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { StyleSheet, Text } from 'react-native';
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
    const oldRender = Text.prototype.render;

    Text.prototype.render = function (...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [origin.props.style, styles.defaultFontFamily]
      });
    };
    
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'lucida grande',
  }
});

export default App;
