import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import ItemList from './components/ItemList';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';
import ProviderList from './components/ProviderList';
import PackageList from './components/PackageList';
import CustomerForm from './components/CustomerForm';
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
            initial
            onLeft={() => {
              Actions.pop()
              Actions.login()
            }}
            leftTitle="Sign In"
            key="providerList"
            component={ProviderList}
            title="Provider List"
          />

          <Scene
            key="packageList"
            component={PackageList}
            title="List Paket"
          />

          <Scene
            key="customerForm"
            component={CustomerForm}
            title="Form Detail"
          />
        </Scene>

        <Scene key="manager">
          <Scene
            initial
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

export default connect (null, {
  backPage
})(RouterComponent);
