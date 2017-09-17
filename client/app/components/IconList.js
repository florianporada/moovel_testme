import React from 'react';
import { View, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import helper from '../helper';
import { styles, colors } from '../config/styles';

class IconList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalContent } = this.props;

    return (
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
    );
  }
}

IconList.propTypes = {
  modalContent: PropTypes.object
};

export default IconList;
