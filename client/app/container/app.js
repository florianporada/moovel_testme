import React from 'react';
import  { ListItem, Header, Icon } from 'react-native-elements'
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
      errorMessage: '',
    }
  }

  // get data from api service and set state according to response / error
  _apiCall() {
    ApiService.getJavaDevelopers().then((res) => {
      if (res.error) {
        this.setState({
          errorMessage: res.error.toString(),
          isLoading: false,
          hasErrored: true,
        });
      } else if (res.toString() === 'TypeError: Network request failed') {
        this.setState({
          errorMessage: res.toString(),
          isLoading: false,
          hasErrored: true,
        });
      } else {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          hasErrored: false,
          dataSource: ds.cloneWithRows(res),
        });
      }
    });
  }

  // rerun the apicall and get fresh data
  _reload () {
    this.setState({
      isLoading: true,
      hasErrored: false,
    });
    this._apiCall();
  }

  // function for right header button
  _headerRight () {
    logger.log('info', 'header right');
    this._reload();
  }

  // function for left header button
  _headerLeft () {
    logger.log('info', 'header left');

    // get single profile (mine by default)
    ApiService.getSingleProfile().then((res) => {
      if (res.error) {
        this.setState({
          errorMessage: res.error.toString(),
          isLoading: false,
          hasErrored: true,
        });
      } else if (res.toString() === 'TypeError: Network request failed') {
        this.setState({
          errorMessage: res.toString(),
          isLoading: false,
          hasErrored: true,
        });
      } else {
        this.setState({
          isLoading: false,
          hasErrored: false,
        });

        this.props.actions.showModal(res);
      }
    });
  }

  // render single row (react-native-elements ListItem)
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

  // trigger api call after component did mount
  componentDidMount() {
    this._apiCall();
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
          <Text style={[styles.bold, styles.center]}>Error!</Text>
          <Text style={styles.center}>{this.state.errorMessage}</Text>
          <Icon
            raised
            name='cached'
            color={colors.primary1}
            onPress={() => {
              this._reload();
            }}
            />
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

// redux state to props mapper
function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    modalContent: state.modal.modalContent
  };
}

// redux dispatch to props mapper
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
