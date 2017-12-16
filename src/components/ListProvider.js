import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListProvider extends Component {
  onRowPress() {
    const { item } = this.props;

    Actions.packageList({ item, title: "List Paket " + (item).toUpperCase() });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={styles.viewStyle}>
          <CardSection>
              <Text style={styles.textStyle}>{this.props.item}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  viewStyle: {
    paddingTop: 15,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20,
  }
};

export default ListProvider;
