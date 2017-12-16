import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, BackHandler } from 'react-native';
import { itemsFetch } from '../actions';
import ListProvider from './ListProvider';
import { CardSection } from './common';

class ProviderList extends Component{
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  }

  componentWillMount() {
    this.props.itemsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  compareName(a, b) {
    // careful, not reusable, make a keyField update
    const childA = a.name.toUpperCase();
    const childB = b.name.toUpperCase();

    let comparison = 0;
    if (childA > childB) {
      comparison = 1;
    } else if (childA < childB) {
      comparison = -1;
    }

    return comparison;
  }

  createDataSource({ items }){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    items.sort(this.compareName);

    const filteredItems = _.uniq(_.map(items, "name"));

    console.log(filteredItems);

    this.dataSource = ds.cloneWithRows(filteredItems);
  }

  renderRow(item) {
    return <ListProvider item={item} />;
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <CardSection>
            <Text style={styles.textStyle}>Nama Provider</Text>
        </CardSection>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  const items = _.map(state.items, (val, uid) => {
    return {...val, uid};
  });

  return { items };
};

export default connect(mapStateToProps, { itemsFetch })( ProviderList );