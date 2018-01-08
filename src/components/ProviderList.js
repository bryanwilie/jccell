import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, BackHandler, Keyboard } from 'react-native';
import { itemsFetch } from '../actions';
import ListProvider from './ListProvider';
import { CardSection } from './common';

class ProviderList extends Component{
  componentDidMount() {
    Keyboard.dismiss();
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

    const filteredItems = _.sortedUniq(_.map(items, "name"));

    this.dataSource = ds.cloneWithRows(filteredItems);
  }

  renderRow(item) {
    return <ListProvider item={item} />;
  }

  render() {
    const {viewStyle, textStyle, containerStyle} = styles;

    return (
      <View style={viewStyle}>
        <CardSection style={viewStyle}>
            <Text style={textStyle}>Pilih Provider</Text>
        </CardSection>
        <ListView
          contentContainerStyle={containerStyle}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 50
  }
};

const mapStateToProps = state => {
  const items = _.map(state.items, (val, uid) => {
    return {...val, uid};
  });

  return { items };
};

export default connect(mapStateToProps, { itemsFetch })( ProviderList );
