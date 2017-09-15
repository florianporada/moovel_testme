import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Badge, Avatar, Icon } from 'react-native-elements'
import { logger } from 'react-native-logger';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';
import { styles, colors } from '../config/styles';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, modalContent } = this.props;

    logger.log(modalContent);

    return (
      <View style={styles.flexZero}>
      <View style={[styles.profileCardGeneric, ]}>
        <View>
          <Avatar
            large
            rounded
            source={{uri: modalContent.avatar_url}}
            activeOpacity={0.7}
          />
          <Badge
            value={modalContent.followers}
            textStyle={styles.badgeText}
            containerStyle={styles.badgeContainer}
          />
        </View>
        <View style={styles.profileCardInfo}>
          <Text><Text style={styles.bold}>Username: </Text>{modalContent.login}</Text>
          <Text><Text style={styles.bold}>Name: </Text>{modalContent.name}</Text>
          <Text><Text style={styles.bold}>Joined: </Text>{modalContent.created_at}</Text>
          <Text><Text style={styles.bold}>Bio: </Text>{modalContent.bio}</Text>
        </View>
      </View>
      <View style={[styles.profileCardGeneric, styles.profileCardIconWrap]}>
        <Icon
          raised
          name='send'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => { Linking.openURL(`mailto:${modalContent.email}`);}}
        />
        <Icon
          raised
          name='github'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => { Linking.openURL(modalContent.html_url);}}
        />
        <Icon
          raised
          name='globe'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => { Linking.openURL(modal.blog);}}
        />
      </View>
      <View style={styles.flexZero}>
        <Icon
          name='times'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => actions.hideModal()}
        />
      </View>
     </View>
    );
  }
}

ProfileCard.propTypes = {
  actions: PropTypes.object,
  modalContent: PropTypes.object
};

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    modalContent: state.modal.modalContent,
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
)(ProfileCard);
