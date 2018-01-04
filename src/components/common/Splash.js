import React, { Component } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { CardSection } from './CardSection';

class Splash extends Component {

  render() {
    const { containerStyle, textStyle, cardSectionStyle, imageStyle } = styles;

    return (
      <Modal
        visible={this.props.visible}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
            <Image
              source={require('../../images/JCCell_splash.png')}
              style={imageStyle}
            >
            </Image>
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
  },
  imageStyle: {

  }
};

export default Splash;
