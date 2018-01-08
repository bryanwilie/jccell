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
      height: 20,
      left: 0,
      paddingLeft: 5,
      top: !isFocused ? 22 : 10,
      fontSize: !isFocused ? 18 : 12,
      color: !isFocused ? '#aaa' : '#000',
    };
    const { secureTextEntry, onEndEditing, onChangeText, value, style } = this.props;

    return(
      <View style={style}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style = {textInputStyle}
          onFocus = {this.handleFocus}
          onBlur = {this.handleBlur}
          blurOnSubmit
          secureTextEntry={secureTextEntry}
          onEndEditing={onEndEditing}
          onChangeText={onChangeText}
          autoCorrect={false}
          value={value}
        />
      </View>
    );
  }
}

const styles = {
  textInputStyle: {
    height: 40,
    fontSize: 18,
    color: '#000'
  }
};

export default Input;
