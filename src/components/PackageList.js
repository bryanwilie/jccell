import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, BackHandler, Keyboard } from 'react-native';
import { itemsFetch, hardwareBackCustomer } from '../actions';
import ListPackage from './ListPackage';
import { CardSection } from './common';

class PackageList extends Component{
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

  componentWillMount() {
    this.props.itemsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  compareDetail(a, b) {
    // careful, not reusable, make a keyField update
    const ketA = a.detail.toUpperCase();
    const ketB = b.detail.toUpperCase();
    const besarA = a.size.toUpperCase();
    const besarB = b.size.toUpperCase();
    const hargaA = a.price.toUpperCase();
    const hargaB = b.price.toUpperCase();

    let comparison = 0;
    if (ketA > ketB) {
      comparison = 1;
    } else if (ketA < ketB) {
      comparison = -1;
    } else if (ketA == ketB) {
      if (besarA > besarB) {
        comparison = -1;
      } else if (besarA < besarB) {
        comparison = 1;
      } else if (besarA == besarB) {
        if (hargaA > hargaB) {
          comparison = 1;
        } else if (hargaA < hargaB) {
          comparison = -1;
        }
      }
    }

    return comparison;
  }

  createDataSource({ items }){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    items.sort(this.compareDetail);

    var filteredItems = _.filter(items, {name: this.props.selectedProvider});

    filteredItems = filteredItems.filter((filteredItems, index, self) => index === self.findIndex((t) => (
    t.detail === filteredItems.detail && t.size === filteredItems.size && t.price === filteredItems.price && t.code === filteredItems.code
      ))
    )

    this.dataSource = ds.cloneWithRows(filteredItems);
  }

  renderRow(item) {
    return <ListPackage item={item} />;
  }

  render() {
    return (
      <View>
        <CardSection style={{paddingLeft: 14}}>
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

const mapStateToProps = (state) => {
  const items = _.map(state.items, (val, uid) => {
    return {...val, uid};
  });

  const { selectedProvider } = state.customerForm;

  return { items, selectedProvider };
};

export default connect(mapStateToProps, { itemsFetch, hardwareBackCustomer })( PackageList );
