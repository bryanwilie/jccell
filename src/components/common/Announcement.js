import React, { Component } from 'react';
import { Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './CardSection';

class Announcement extends Component {

  render() {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType="slide"
        onRequestClose={() => {this.props.onRequestClose()}}
      >
        <TouchableWithoutFeedback
          onPress={() => {this.props.onRequestClose()}}>
          <View style={containerStyle}>
            <CardSection style={cardSectionStyle}>
              <Text style={textStyle}>{this.props.children}</Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
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

export default Announcement;
