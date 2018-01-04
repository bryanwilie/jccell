import React, { Component } from 'react';
import { View, Text, Picker, BackHandler } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { itemUpdate, backPage } from '../actions';
import { CardSection, StandardInput } from './common';

class ItemForm extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.backPage();
    return true;
  }

  render() {
    let details = [{
      value: 'pulsa', }, { value: 'data', }, { value: 'sms', }, {
      value: 'saldo', }, { value: 'top-up', }, { value: 'e-money',
    }];

    return (
      <View>
        <CardSection>
          <StandardInput
            label="Nama Operator"
            placeholder="Operator"
            value={this.props.name}
            onChangeText={value => this.props.itemUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <Text style={styles.pickerTextStyle}>Jenis</Text>
          <Dropdown
            label=""
            containerStyle={styles.containerStyle}
            data={details}
            value={this.props.detail}
            onChangeText={value => this.props.itemUpdate({ prop: 'detail', value })}
          />
        </CardSection>

        <CardSection>
          <StandardInput
            label="Besarnya"
            placeholder="5k, 100k, 2000k, 10 GB"
            value={this.props.size}
            onChangeText={value => this.props.itemUpdate({ prop: 'size', value })}
          />
        </CardSection>

        <CardSection>
          <StandardInput
            label="Harga"
            placeholder="4.5k, 25.5k, 50k"
            value={this.props.price}
            onChangeText={value => this.props.itemUpdate({ prop: 'price', value })}
          />
        </CardSection>

        <CardSection>
          <StandardInput
            label="Kode Produk"
            placeholder="S25, GOPAY150"
            value={this.props.code}
            onChangeText={value => this.props.itemUpdate({ prop: 'code', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 2,
    height: 40,
    justifyContent: 'center'
  },
  pickerTextStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 15
  }
}

const mapStateToProps = (state) => {
  const { name, detail, size, price, code } = state.itemForm;

  return { name, detail, size, price, code };
};

export default connect(mapStateToProps, {
  itemUpdate, backPage
}) ( ItemForm );
