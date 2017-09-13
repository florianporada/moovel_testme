import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ListView } from 'react-native';

class ListItem extends React.Component {
  render() {
    return (
      <Text>{this.props.name}</Text>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://192.168.178.117:8080/api/github/users')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ListItem name={rowData.login} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
