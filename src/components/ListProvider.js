import React, { Component } from 'react';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { customerFormUpdate } from '../actions';
import { CardSection } from './common';

class ListProvider extends Component {
  onRowPress() {
    const { item } = this.props;

    this.props.customerFormUpdate({ prop: 'selectedProvider', value: (item) });
    Actions.packageList({ title: "List Paket " + (item).toUpperCase() });
  }

  render() {
    const {item} = this.props
    const {viewStyle, containerStyle, textStyle, imageStyle} = styles;

    var imageMap = {
      'gojek' : require('../images/logo_gojek.png'),
      'grab' : require('../images/logo_grab.png'),
      'gopay' : require('../images/logo_gopay.png'),
      'e-money' : require('../images/logo_e-money.png'),
      'pln' : require('../images/logo_pln.png'),
      '3' : require('../images/logo_3.png'),
      'xl' : require('../images/logo_xl.png'),
      'tsel' : require('../images/logo_tsel.png'),
      'isat' : require('../images/logo_isat.png'),
      'sfren' : require('../images/logo_sfren.png'),
      'etc' : require('../images/logo_new.png')
    }

    const provider = [ 'gojek', 'grab', 'gopay', 'e-money', 'pln', '3', 'xl', 'tsel', 'isat', 'sfren' ].includes(item) ? (item) : 'etc';

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={viewStyle}>
          <CardSection style={containerStyle}>
              <Image
                source={imageMap[(provider)]}
                style={imageStyle}
              >
              </Image>
              <Text style={textStyle}>{item}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  viewStyle: {
    paddingTop: 15,
    alignItems: 'center',
    margin: 15,
    width: 150,
    height: 150
  },
  containerStyle: {
    flexDirection: 'column',
  },
  textStyle: {
    flex: 0.2,
    alignSelf: 'center',
    fontSize: 16
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 150,
    height: 150
  }
};

export default connect(null, { customerFormUpdate }) (ListProvider);
