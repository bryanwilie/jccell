import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
  onRowPress() {
    Actions.itemEdit({ item: this.props.item });
  }

  render() {
    const { name, detail, size, price, code } = this.props.item;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={styles.viewStyle}>
          <CardSection>
            <View style={{flex: 0.9}}>
              <Text style={styles.textStyle}>{name}</Text>
            </View>
            <View style={{flex: 0.9}}>
              <Text style={styles.textStyle}>{detail}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textStyle}>{size}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textStyle}>{price}</Text>
            </View>
            <View style={{flex: 1.6}}>
              <Text style={styles.textStyle}>{code}</Text>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  viewStyle: {
    paddingLeft: 10,
    flex: 1
  },
  textStyle: {
    fontSize: 18
  }
};

export default ListItem;
