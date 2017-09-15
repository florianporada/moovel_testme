import React from 'react';
import { Text, View, Linking, TouchableOpacity } from 'react-native';
import { Badge, Button, Avatar, Icon } from 'react-native-elements'
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
            value={30}
            textStyle={styles.badgeText}
            containerStyle={styles.badgeContainer}
          />
        </View>
        <Text>Hello {modalContent.login}! </Text>
      </View>
      <View style={styles.profileCardGeneric}>
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
          onPress={() => { Linking.openURL('mailto:somethingemail@gmail.com&subject=abcdefg&body=body');}}
        />
      </View>
      <View style={styles.flexZero}>
        <TouchableOpacity
          onPress={() => actions.hideModal()}>
          <Text style={{ textAlign: 'center' }} >Close modal</Text>
        </TouchableOpacity>

        {/*<Button
          icon={{name: 'squirrel', type: 'octicon' }}
          onPress={() => {
            actions.hideModal();
          }}
          />*/}
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
