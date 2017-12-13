import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemUpdate, itemCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ItemForm from './ItemForm';

class ItemCreate extends Component {
  onButtonPress() {
    const { name, detail, size, price, code } = this.props;

    this.props.itemCreate({ name, detail: detail || 'saldo', size, price, code });
  }

  render() {
    return (
      <Card>
        <ItemForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, detail, size, price, code } = state.itemForm;

  return { name, detail, size, price, code};
};

export default connect(mapStateToProps, {
  itemUpdate, itemCreate
})( ItemCreate );
