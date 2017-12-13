import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import ItemList from './components/ItemList';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';
import { backPage } from './actions';

class RouterComponent extends Component {
  onBackFunction() {
    this.props.backPage();
  }

  render() {
    return(
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login"
            />
        </Scene>

        <Scene key="main">
          <Scene
            onRight={() => Actions.itemCreate()}
            rightTitle="Add New"
            onLeft={() => {
              Actions.pop()
              Actions.login()
            }}
            leftTitle="Log Out"
            key="itemList"
            component={ItemList}
            title="Items"
            initial
          />

          <Scene
            key="itemCreate"
            component={ItemCreate}
            title="Create New Item"
          />

          <Scene
            key='itemEdit'
            onBack={() => {
              Actions.itemList()
              this.onBackFunction()
            }}
            component={ItemEdit}
            title="Edit Item"
          />
        </Scene>
      </Router>
    ); // paddingTop 60 on Android
  };
};
// title will be shown at the navbar on the top of the screen

export default connect (null, {
  backPage
})(RouterComponent);
