import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { defaultAccountFetch, emailChanged, passwordChanged, loginUser } from '../actions';
import { Button, Card, CardSection, StandardInput, Spinner } from './common';
import Splash from './common/Splash';

class LoginForm extends Component {
  componentWillMount() {
    this.props.defaultAccountFetch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showSplash: false});
  }

  state = {showSplash: true};

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLogin() {
    const { email, password } = this.props;
    const { useAsCatalogue, signUpSwitch } = this.props;

    var allowSignUp = signUpSwitch;
    var skip = false;

    this.props.loginUser({ email, password, useAsCatalogue, allowSignUp, skip });
  }

  onImagePress() {
    const { defaultEmail, defaultPassword, useAsCatalogue } = this.props;

    var email = defaultEmail;
    var password = defaultPassword;
    var allowSignUp = false;
    var skip = true;

    this.props.loginUser({ email, password, useAsCatalogue, allowSignUp, skip });
  }

  renderLoginButton() {
    if (this.props.loadingLogin) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onLogin.bind(this)}>
        Login
      </Button>
    );
  }

  renderSkipButton() {
    if (this.props.loadingSkip) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onSkip.bind(this)}>
        Skip
      </Button>
    );
  }

  render() {
    const {email, password, error} = this.props;
    const {buttonStyle, containerStyle, imageStyle, errorTextStyle} = styles;

    return (
      <Card>
        <CardSection>
          <TouchableOpacity onPress={this.onImagePress.bind(this)} style= {buttonStyle}>
            <Image
              source={require('../images/JCCell_cover.png')}
              style={imageStyle}
            >
            </Image>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <StandardInput
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={email}
          />
        </CardSection>

        <CardSection>
          <StandardInput
            secureTextEntry={true}
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={password}
          />
        </CardSection>

        <Text style={errorTextStyle}>
         {error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <Splash
          visible = {this.state.showSplash}
        />

      </Card>
    );
  }
}


const styles = {
  errorTextStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  },
  imageStyle: {
    flex: 1,
    height: 75,
    borderRadius: 75,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  buttonStyle: {
    flex: 1,
    height: 125,
    width: Dimensions.get('window').width,
    borderRadius: 75
  }
};

const mapStateToProps = (state) => {
  const { email, password, error, loadingLogin, loadingSkip } = state.auth;
  const { defaultEmail, defaultPassword, useAsCatalogue, signUpSwitch } = state.customerForm;

  return { email, password, error, loadingLogin, loadingSkip, defaultEmail, defaultPassword, useAsCatalogue, signUpSwitch };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, defaultAccountFetch
})(LoginForm);
