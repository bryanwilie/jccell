import _ from 'lodash';
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ItemForm from './ItemForm';
import { itemUpdate, itemSave, itemDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ItemEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.item, (value, prop) => {
      this.props.itemUpdate({ prop, value })
    });
  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  onButtonPress() {
    const { name, detail, size, price, code } = this.props;

    this.props.itemSave({ name, detail, size, price, code, uid: this.props.item.uid});
  }

  onAccept() {
    const { uid } = this.props.item;

    this.props.itemDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ItemForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete item
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, detail, size, price, code } = state.itemForm;

  return { name, detail, size, price, code };
};

export default connect(mapStateToProps, {
  itemUpdate, itemSave, itemDelete
})(ItemEdit);
