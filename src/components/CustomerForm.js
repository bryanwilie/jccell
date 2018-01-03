import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { customerFormUpdate, hardwareBackCustomer, sendSms } from '../actions';
import { CardSection, Input, Button, Confirm} from './common';
import Announcement from './common/Announcement';

class CustomerForm extends Component {
  state = { showConfirm: false, showSucceed: false, showEmpty: false, showPhone: false, showPinNotEnough: false};

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.hardwareBackCustomer();
    return true;
  }

  onButtonPress() {
    if (((this.props.phone)=="")||((this.props.pin)=="")) {
      this.setState({ showEmpty: true });
    } else if (this.props.phone.length <= 8) {
      this.setState({ showPhone: true });
    } else if (this.props.pin.length != 6) {
      this.setState({ showPinNotEnough: true });
    } else {
      this.setState({ showConfirm: !this.state.showConfirm })
    }
  }

  onAccept() {
    const { name, detail, size, price, code } = this.props.item;
    const { phone, pin, defaultPhone } = this.props;

    console.log(defaultPhone);

    this.setState({ showSucceed: !this.state.showSucceed });

    this.props.sendSms({ defaultPhone, phone, pin, name, detail, size, price, code });
  }

  onDecline() {
    this.setState({ showConfirm: false });
  }

  onRequestClose() {
    this.setState({
      showSucceed: false,
      showConfirm: false,
      showEmpty: false,
      showPhone: false,
      showPinNotEnough: false
    });
  }

  render() {
    const { name, detail, size, price, code } = this.props.item;
    const { phone, pin } = this.props;

    (name).toUpperCase()

    return (
      <View>
        <Text style={styles.textStyle}>
          Silahkan isi nomor HP dan PIN anda
        </Text>

        <CardSection>
          <Input
            label="Nomor HP"
            placeholder="0811 222 333 44"
            value={phone}
            onChangeText={value => this.props.customerFormUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="PIN"
            placeholder="123456"
            value={pin}
            onChangeText={value => this.props.customerFormUpdate({ prop: 'pin', value })}
          />
        </CardSection>

        <Text style={styles.textStyle}>
          Total pembelanjaan anda adalah Rp {price}
        </Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Lanjut
          </Button>
        </CardSection>

        <Announcement
          visible = {this.state.showEmpty}
          children = "Semua bagian harus diisi"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Announcement
          visible = {this.state.showPhone}
          children = "Nomor hp tidak valid"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Announcement
          visible = {this.state.showPinNotEnough}
          children = "PIN harus 6 digit"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Confirm
          visible={this.state.showConfirm}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Apakah semua data yang dimasukkan sudah benar?
        </Confirm>

        <Announcement
          visible= {this.state.showSucceed}
          children= "Transaksi berhasil!"
          onRequestClose= {this.onRequestClose.bind(this)}
        />
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
  const { phone, pin, defaultPhone } = state.customerForm;

  return { phone, pin, defaultPhone };
};

export default connect(mapStateToProps, {
  customerFormUpdate, hardwareBackCustomer, sendSms
}) ( CustomerForm );
