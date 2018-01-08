import React, { Component } from 'react';
import { View, Text, BackHandler, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { customerFormUpdate, hardwareBackCustomer, sendSms } from '../actions';
import { CardSection, StandardInput, Button, Confirm} from './common';
import Announcement from './common/Announcement';
import Input from './common/Input';

class CustomerForm extends Component {
  state = { showConfirm: false, showSucceed: false, showEmpty: false, showPhone: false, showPinNotEnough: false};

  componentDidMount() {
    Keyboard.dismiss();
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
    const { phone, pin, customerFormUpdate } = this.props;
    const { showSucceed, showEmpty, showConfirm, showPhone, showPinNotEnough } = this.state;
    const { containerInputStyle, textStyle, textInputStyle } = styles;

    (name).toUpperCase()

    return (
      <View>
        <Text style={textStyle}>
          Silahkan isi nomor HP dan PIN anda
        </Text>

        <Input
          style={textInputStyle}
          label="Nomor HP"
          value={phone}
          onChangeText={value => customerFormUpdate({ prop: 'phone', value })}
        />

        <Input
          style={textInputStyle}
          secureTextEntry
          label="PIN"
          value={pin}
          onChangeText={value => customerFormUpdate({ prop: 'pin', value })}
        />

        <Text style={textStyle}>
          Total pembelanjaan anda adalah Rp {price}
        </Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Lanjut
          </Button>
        </CardSection>

        <Announcement
          visible = {showEmpty}
          children = "Semua bagian harus diisi"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Announcement
          visible = {showPhone}
          children = "Nomor hp tidak valid"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Announcement
          visible = {showPinNotEnough}
          children = "PIN harus 6 digit"
          onRequestClose = {this.onRequestClose.bind(this)}
        />

        <Confirm
          visible={showConfirm}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Apakah semua data yang dimasukkan sudah benar?
        </Confirm>

        <Announcement
          visible= {showSucceed}
          children= "Transaksi berhasil!"
          onRequestClose= {this.onRequestClose.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  containerInputStyle: {
    height: 70,
  },
  textInputStyle: {
    paddingLeft: 15,
    paddingRight: 20,
    width: Dimensions.get('window').width,
    height: 50
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 25,
    paddingBottom: 15
  }
}

const mapStateToProps = (state) => {
  const { phone, pin, defaultPhone } = state.customerForm;

  return { phone, pin, defaultPhone };
};

export default connect(mapStateToProps, {
  customerFormUpdate, hardwareBackCustomer, sendSms
}) ( CustomerForm );
