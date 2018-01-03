import _ from 'lodash';
import React, { Component } from 'react';
import { Text, Switch, TouchableOpacity, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setDefaultSuccess, defaultAccountFetch, setSignUp, ownerPhoneUpdate, defaultOwnerPhoneUpdate } from '../actions';
import { Card, CardSection, Input } from './common';
import Announcement from './common/Announcement';

class UserPage extends Component {
  componentWillMount() {
    this.props.defaultAccountFetch();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        signUpSwitch: nextProps.signUpSwitch,
        defaultUserSwitch: nextProps.defaultSwitchState,
        loggedInEmail:  nextProps.loggedInEmail,
        loggedInPassword: nextProps.loggedInPassword,
        defaultPhone: nextProps.defaultPhone
      });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  }

  state = { signUpSwitch : this.props.signUpSwitch, defaultUserSwitch: this.props.defaultSwitchState, loggedInEmail: '', loggedInPassword: '', defaultPhone: this.props.defaultPhone, showPhone: false};

  onTextPress() {
    Actions.itemList();
  }

  onDefaultSwitch(value) {
    this.props.setDefaultSuccess(value);
  }

  onSignUpSwitch(value) {
    this.props.setSignUp(value);
  }

  onEndEditing(defaultPhone) {
    if (((defaultPhone.length) > 0) && ((defaultPhone.length) <= 8)) {
      this.setState({ showPhone: true });
      this.props.defaultAccountFetch();
    } else {
      this.props.defaultOwnerPhoneUpdate(defaultPhone);
    }
  }

  onRequestClose() {
    this.setState({
      showPhone: false
    });
  }

  render() {
    const { containerStyle, containerSwitchStyle, switchTextStyle, switchButtonStyle, textStyle } = styles;
    const { signUpSwitch, defaultUserSwitch, loggedInEmail, loggedInPassword } = this.state;

    return(
      <Card>
        <CardSection style={containerStyle}>
          <TouchableOpacity onPress={this.onTextPress.bind(this)}>
            <Text style={textStyle}>
              Edit Item List
            </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection style={containerStyle}>
          <Input
            label="Seller Phone"
            placeholder="0811 222 333 44"
            value={this.props.defaultPhone}
            onChangeText={value => this.props.ownerPhoneUpdate({ prop: 'defaultPhone', value})}
            onEndEditing={event => this.onEndEditing(event.nativeEvent.text)}
          />
        </CardSection>

        <CardSection style={containerSwitchStyle}>
          <Text style={switchTextStyle}>
            Allow new Sign Up
          </Text>
          <Switch
            style={switchButtonStyle}
            value={signUpSwitch}
            onValueChange={(value) => {
              this.setState({ signUpSwitch: value })
              this.onSignUpSwitch(value)
            }}
          />
        </CardSection>

        <CardSection style={containerSwitchStyle}>
          <Text style={switchTextStyle}>
            Set as default user
          </Text>
          <Switch
            style={switchButtonStyle}
            value={defaultUserSwitch}
            onValueChange={(value) => {
              this.setState({ defaultUserSwitch: value })
              this.onDefaultSwitch({value, loggedInEmail, loggedInPassword})
            }}
          />
        </CardSection>

        <Announcement
          visible = {this.state.showPhone}
          children = "Nomor hp tidak valid"
          onRequestClose = {this.onRequestClose.bind(this)}
        />
      </Card>
    );
  }
}

const styles = {
  switchTextStyle: {
    flex: 4,
    fontSize: 18,
    paddingLeft: 15
  },
  switchButtonStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  containerStyle: {
    paddingTop: 10,
    paddingBottom: 15
  },
  containerSwitchStyle: {
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row'
  }
};

const mapStateToProps = (state) => {
  const { loggedInEmail, loggedInPassword, defaultEmail, defaultPassword, useAsCatalogue, signUpSwitch, defaultPhone } = state.customerForm;

  const defaultSwitchState = ((loggedInEmail == defaultEmail) && (loggedInPassword == defaultPassword));

  return { loggedInEmail, loggedInPassword, defaultSwitchState, signUpSwitch, defaultPhone };
}

export default connect(mapStateToProps, {
  setDefaultSuccess, defaultAccountFetch, setSignUp, ownerPhoneUpdate, defaultOwnerPhoneUpdate
}) ( UserPage );
