import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Badge, Avatar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import helper from '../helper';
import * as actions from '../actions';
import { styles, colors } from '../config/styles';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, modalContent } = this.props;

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
            value={helper.formatNumber(modalContent.followers)}
            textStyle={styles.badgeText}
            containerStyle={[styles.badgeContainer]}
          />
        </View>
        <View style={styles.profileCardInfo}>
          <Text><Text style={styles.bold}>Username: </Text>{modalContent.login}</Text>
          <Text><Text style={styles.bold}>Name: </Text>{modalContent.name}</Text>
          <Text><Text style={styles.bold}>Joined: </Text>{helper.formatDate(modalContent.created_at)}</Text>
          <Text><Text style={styles.bold}>Bio: </Text>{modalContent.bio}</Text>
        </View>
      </View>
      <View style={[styles.profileCardGeneric, styles.profileCardIconWrap]}>
        <Icon
          raised
          name='send'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => {
            if (helper.isEmpty(modalContent.email)) {
              helper.infoAlert();
            } else {
              Linking.openURL(`mailto:${modalContent.email}`);
            }
          }}
        />
        <Icon
          raised
          name='github'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => {
            if (helper.isEmpty(modalContent.html_url)) {
              helper.infoAlert();
            } else {
              Linking.openURL(modalContent.html_url);
            }
          }}
        />
        <Icon
          raised
          name='globe'
          type='font-awesome'
          color={colors.primary1}
          onPress={() => {
            if (helper.isEmpty(modalContent.blog)) {
              helper.infoAlert();
            } else {
              Linking.openURL(modalContent.blog);
            }
          }}
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
