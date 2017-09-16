import React from 'react';
import  { ListItem, Header } from 'react-native-elements'
import { ActivityIndicator, View, ListView } from 'react-native';
import Modal from 'react-native-simple-modal';
import { logger } from 'react-native-logger';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import ApiService from '../api';
import ProfileCard from '../components/ProfileCard'
import { colors, styles } from '../config/styles'

class TheApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  _onPress (data) {
    this.props.actions.showModal(data);
  }

  _headerRight () {
    logger.log('info', 'header right');
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

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color:  colors.grey5, onPress: () => {} }}
          centerComponent={{ text: 'hi', style: { color: colors.grey5 } }}
          rightComponent={{ icon: 'info-outline', color: colors.grey5, onPress: () => { this._headerRight() } }}
          outerContainerStyles={ styles.navBar }
        />
        <ListView
          style={styles.userList}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        <Modal
          open={this.props.modalVisible}
          modalDidOpen={() => logger.log('modal did open')}
          modalDidClose={() => this.props.actions.hideModal()}>
            <ProfileCard />
          </Modal>
      </View>
    );
  }
}

TheApp.propTypes = {
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
)(TheApp);
