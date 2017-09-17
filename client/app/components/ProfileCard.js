import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';

import helper from '../helper';
import { styles } from '../config/styles';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalContent } = this.props;

    return (
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
    );
  }
}

ProfileCard.propTypes = {
  modalContent: PropTypes.object
};

export default ProfileCard;
