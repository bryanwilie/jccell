import _ from 'lodash'; // low dash
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    // this is async function, eventually will update the global state

    this.createDataSource(this.props);
    // better create this.createDataSource in both places so that the global state data (not empty) could also be loaded first, before the nextProps done fetched for us

    /*
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.employees);
    // this will always be empty, but eventually will receive something, if the async func is done updating the global state, via the auto update of map state to props
    */
  }

  componentWillReceiveProps(nextProps) {
    // called with new set of props that component about to be fed and it's captured as nextProps
    // nextProps are the next set of props that this component will be rendered with
    // this.props is still the old set of props
    // we get access to both set of props, both the old this.props and nextProps
    // nice method for reacting to any change in your props object
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
    // cloneWithRows expect an array to be passed
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    /*
    console.log(this.props);
    // will results in 2 render, first empty array and next is the current data
    */

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

// enableEmptySections is an issue in react native

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  // for every element/key val pair in state.employees,
  // take the employee model (val = name, phone, shift) and key (uid = unique id) only,
  // and return an object containing
  // all properties of the employee model (val) and an uid
  // result: { shift: 'Monday', name: 'S', id: '1xfdf' }
  // map function will collect that result object,
  // put them into an array and assigned to 'employees'

  return { employees };
  // array of employees is available inside our components as this.props.employees
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
