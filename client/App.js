import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator, StyleSheet, Text, View, ListView } from 'react-native';

class ListRow extends React.Component {
  render() {
    return (
      <Text>{this.props.name}</Text>
    );
  }
}

ListRow.propTypes = {
  name: PropTypes.string
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  _renderRow (rowData) {
    return (
      <ListItem
        roundAvatar
        hideChevron
        title={rowData.login}
        subtitle={rowData.id}
        avatar={{uri:rowData.avatar_url}}
      />
    )
  }
  _getGithubUsers() {
    return fetch('http://192.168.178.117:8080/api/github/users')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._getGithubUsers();
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
          renderRow={this._renderRow}
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
