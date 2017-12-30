import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { itemsFetch } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';

class ItemList extends Component{
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

    this.dataSource = ds.cloneWithRows(items);
  }

  renderRow(item) {
    return <ListItem item={item} />;
  }

  render() {
    return (
      <View>
        <CardSection style={{paddingLeft: 14}}>
          <View style={{flex: 0.6}}>
            <Text style={styles.textStyle}>Nama</Text>
          </View>
          <View style={{flex: 0.55}}>
            <Text style={styles.textStyle}>Ket.</Text>
          </View>
          <View style={{flex: 0.7}}>
            <Text style={styles.textStyle}>Jumlah</Text>
          </View>
          <View style={{flex: 0.65}}>
            <Text style={styles.textStyle}>Harga</Text>
          </View>
          <View style={{flex: 1.1}}>
            <Text style={styles.textStyle}>Kode</Text>
          </View>
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
    fontSize: 18,
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  const items = _.map(state.items, (val, uid) => {
    return {...val, uid};
  });

  return { items };
};

export default connect(mapStateToProps, { itemsFetch })( ItemList );
