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
import { backPage, backCustomer } from './actions';

class RouterComponent extends Component {
  onBackPageFunction() {
    this.props.backPage();
  }

  onBackCustomerFunction() {
    this.props.backCustomer();
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
            key="providerList"
            onLeft={() => {
              Actions.pop()
              Actions.login()
            }}
            leftTitle="Log In"
            component={ProviderList}
            title="Provider List"
          />

          <Scene
            key="packageList"
            onBack={() => {
              this.onBackCustomerFunction()
              Actions.providerList()
            }}
            component={PackageList}
            title="List Paket"
          />

          <Scene
            key="customerForm"
            onBack={() => {
              this.onBackCustomerFunction()
              Actions.packageList()
            }}
            component={CustomerForm}
            title="Form Detail"
          />
        </Scene>

        <Scene key="manager">
          <Scene
            initial
            key="itemList"
            onRight={() => Actions.itemCreate()}
            rightTitle="Add New"
            onLeft={() => {
              Actions.pop()
              Actions.login()
            }}
            leftTitle="Log Out"
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
              this.onBackPageFunction()
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
  backPage, backCustomer
})(RouterComponent);
