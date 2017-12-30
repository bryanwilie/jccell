import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
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

export default connect(null, { customerFormUpdate }) (ListProvider);
