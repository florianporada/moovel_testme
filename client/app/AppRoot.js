import React from 'react';
import  { ListItem, Header } from 'react-native-elements'
import { ActivityIndicator, StyleSheet, View, ListView, Modal, Text, TouchableHighlight } from 'react-native';
import { logger } from 'react-native-logger';

import ApiService from './api/ApiService';
import ProfileCard from './components/ProfileCard'
import { colors, layout } from './config/styles'

export default class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false,
    }
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onPress (data) {
    logger.log('info', data);
  }

  _headerRight () {
    logger.log('info', 'header right');
    this._setModalVisible(true);
  }

  _headerLeft () {
    logger.log('info', 'header left');
  }

  _renderRow (rowData) {
    return (
      <ListItem
        roundAvatar
        hideChevron
        onPress={() => { this._onPress(rowData) }}
        title={rowData.login}
        avatar={{uri:rowData.avatar_url}}
      />
    );
  }

  componentDidMount() {
    ApiService.getUsers().then((res) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
        <View style={styles.loadingView}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color:  colors.grey5, onPress: () => { this._headerLeft() } }}
          centerComponent={{ text: 'hi', style: { color: colors.grey5 } }}
          rightComponent={{ icon: 'info-outline', color: colors.grey5, onPress: () => { this._headerRight() } }}
          outerContainerStyles={ styles.navBar }
        />
        <ListView
          style={styles.userList}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          // renderRow={(rowData) => <ListRow name={rowData.login} />}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          >
         <ProfileCard name='hi' />
         {/*<View style={styles.profileModal}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this._setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
         </View>*/}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: layout.container,

  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userList: {
    marginTop: 46,
  },
  navBar: {
    backgroundColor: colors.primary,
  },
  profileModal: {
    backgroundColor: colors.grey2,
    marginTop: 22,
  }
});
