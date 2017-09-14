import React from 'react';
import  { ListItem } from 'react-native-elements'
import { ActivityIndicator, StyleSheet, View, ListView } from 'react-native';
import { logger } from 'react-native-logger'
import ApiService from './api/apiService';

export default class AppRoot extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  _onPress (data) {
    logger.log('info', data);
  }

  _renderRow (rowData) {
    return (
      <ListItem
        roundAvatar
        hideChevron
        onPress={() => {this._onPress(rowData)}}
        title={rowData.login}
        subtitle={rowData.id}
        avatar={{uri:rowData.avatar_url}}
      />
    );
  }

  componentDidMount() {
    ApiService.getUsers().then((res) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(res),
      }, () => {
        // do something with new state
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          // renderRow={(rowData) => <ListRow name={rowData.login} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  }
});
