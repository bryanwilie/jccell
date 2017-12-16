import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';

class Succeed extends Component {
  // componentDidMount() {
  //   this.timeoutHandle = setTimeout(() =>{}, 5000);
  // }
  //
  // componentWillUnmount() {
  //   clearTimeout(this.timoutHandle);
  // }

  render() {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>{this.props.children}</Text>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export default Succeed;
