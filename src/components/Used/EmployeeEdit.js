import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  // this.props.employee is the employee we're trying to modify

  state = { showModal: false };

  componentWillMount() {
    // for each props/ key value pair in this.props.employee, take the value with props as its key
    // and call action creator, passing and object with prop and value
    // employee is an obj with key value pair, key: id; value: name, phone, shift
    // this code state that we understand there's an employee model coming up to this component, and we will iterate over every property on that object and update our reducer with every property (as a pre-filled value inside our form reducer)
    _.each(this.props.employee, (value, prop) => {
      // calling our action creator
      this.props.employeeUpdate({ prop, value })
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    //from form reducer

    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    // this.props.employee is coming from onrowpress, ListItem
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
    // use string interpolation, for template strings, so use backticks
    // could also use export
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
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
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift};
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
