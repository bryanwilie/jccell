import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLogin() {
    const { email, password } = this.props;
    var skip = false;

    this.props.loginUser({ email, password, skip });
  }

  onSkip() {
    // later receive from default email
    var email = "test@test.com";
    var password = "password";
    var skip = true;

    this.props.loginUser({ email, password, skip});
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
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
         {this.props.error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderSkipButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loadingLogin, loadingSkip } = auth;

  return { email, password, error, loadingLogin, loadingSkip };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
