import React from 'react';
import  { ListItem, Header } from 'react-native-elements'
import { ActivityIndicator, View, ListView, Text } from 'react-native';
import { logger } from 'react-native-logger';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import ApiService from '../api';
import ProfileModal from './profileModal'
import { colors, styles } from '../config/styles'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasErrored: false,
    }
  }

  _headerRight () {
    logger.log('info', 'header right');
    this.setState = {
      isLoading: true,
    }

    ApiService.getJavaDevelopers().then((res) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(res),
      });
    });
  }

  _headerLeft () {
    logger.log('info', 'header left');
    const myProfile = {
      login: 'test',
      created_at: new Date().toString(),
      followers: 1000000000000000,
    }
    this.props.actions.showModal(myProfile)
  }

  _renderRow (rowData) {
    return (
      <ListItem
        roundAvatar
        hideChevron
        onPress={() => { this.props.actions.showModal(rowData); }}
        title={rowData.name}
        subtitle={rowData.login}
        avatar={{uri:rowData.avatar_url}}
      />
    );
  }

  componentDidMount() {
    ApiService.getJavaDevelopers().then((res) => {
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

    if (this.state.hasErrored) {
      return (
        <View style={styles.loadingView}>
          <Text>Network Error!</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'account-circle', color:  colors.grey5, onPress: () => { this._headerLeft(); } }}
          centerComponent={{ text: 'hi', style: { color: colors.grey5 } }}
          rightComponent={{ icon: 'cached', color: colors.grey5, onPress: () => { this._headerRight(); } }}
          outerContainerStyles={ styles.navBar }
        />
        <ListView
          style={styles.userList}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        <ProfileModal />
      </View>
    );
  }
}

App.propTypes = {
  name: PropTypes.string,
  modalVisible: PropTypes.bool,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    modalContent: state.modal.modalContent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
