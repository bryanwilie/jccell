import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

class Input extends Component {
  state = { isFocused: false };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
    if ((this.props.value.length) == 0) {
      this.setState({ isFocused: false });
    }
  }

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const { viewStyle, textInputStyle } = styles;
    const labelStyle = {
      // position: 'absolute',
      // left: 0,
      // alignSelf: 'center',
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#aaa' : '#000',
    };

    return(
      <View style={viewStyle}>
        <Text style={labelStyle}>
          {this.props.label}
        </Text>
        <TextInput
          {...props}
          style = {textInputStyle}
          onFocus = {this.handleFocus}
          onBlur = {this.handleBlur}
          blurOnSubmit
          secureTextEntry={this.props.secureTextEntry}
          onEndEditing={this.props.onEndEditing}
          onChangeText={this.props.onChangeText}
          autoCorrect={false}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    // paddingTop: 18,
  },
  textInputStyle: {
    // flex: 2,
    // height: 26,
    fontSize: 18,
    color: '#000',
    // borderBottomWidth: 1,
    // borderBottomColor: '#555'
  }
};

export default Input;
