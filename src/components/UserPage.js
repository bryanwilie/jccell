import _ from 'lodash';
import React, { Component } from 'react';
import { Text, Switch, TouchableOpacity, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setDefaultSuccess, defaultAccountFetch, setSignUp } from '../actions';
import { Card, CardSection } from './common';

class UserPage extends Component {
  componentWillMount() {
    this.props.defaultAccountFetch();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        signUpSwitch : nextProps.signUpSwitch,
        defaultUserSwitch: nextProps.defaultSwitchState,
        loggedInEmail:  nextProps.loggedInEmail,
        loggedInPassword: nextProps.loggedInPassword
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

  state = { signUpSwitch : this.props.signUpSwitch, defaultUserSwitch: this.props.defaultSwitchState, loggedInEmail: '', loggedInPassword: '' };

  onTextPress() {
    Actions.itemList();
  }

  onDefaultSwitch(value) {
    this.props.setDefaultSuccess(value);
  }

  onSignUpSwitch(value) {
    this.props.setSignUp(value);
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
  const { loggedInEmail, loggedInPassword, defaultEmail, defaultPassword, useAsCatalogue, signUpSwitch } = state.customerForm;

  const defaultSwitchState = ((loggedInEmail == defaultEmail) && (loggedInPassword == defaultPassword))

  return { loggedInEmail, loggedInPassword, defaultSwitchState, signUpSwitch };
}

export default connect(mapStateToProps, {
  setDefaultSuccess, defaultAccountFetch, setSignUp
}) ( UserPage );
