import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { customerFormUpdate, backPage, sendSms } from '../actions';
import { CardSection, Input, Button, Confirm, Succeed } from './common';

class CustomerForm extends Component {
  state = { showConfirm: false, showSucceed: false };

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

  onAccept() {
    const { name, detail, size, price, code } = this.props.item;
    const { phone, pin } = this.props;

    this.props.sendSms({ phone, pin, name, detail, size, price, code });
  }

  onDecline() {
    this.setState({ showConfirm: false });
  }

  render() {

    return (
      <View>
        <Text style={styles.textStyle}>
          Silahkan isi nomor HP dan PIN anda
        </Text>

        <CardSection>
          <Input
            label="Nomor HP"
            placeholder="0811 222 333 44"
            value={this.props.phone}
            onChangeText={value => this.props.customerFormUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="PIN"
            placeholder="123456"
            value={this.props.pin}
            onChangeText={value => this.props.customerFormUpdate({ prop: 'pin', value })}
          />
        </CardSection>

        <Text style={styles.textStyle}>
          Total pembelanjaan anda adalah Rp {this.props.item.price}
        </Text>

        <CardSection>
          <Button onPress={() => this.setState({ showConfirm: !this.state.showConfirm })}>
            Lanjut
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showConfirm}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Apakah semua data yang diinput sudah benar?
        </Confirm>

        <Succeed
          visible={this.state.showSucceed}
        >
          Transaksi berhasil!
        </Succeed>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
}

const mapStateToProps = (state) => {
  const { phone, pin } = state.customerForm;

  return { phone, pin };
};

export default connect(mapStateToProps, {
  customerFormUpdate, backPage, sendSms
}) ( CustomerForm );
