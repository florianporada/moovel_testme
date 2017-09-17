import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { logger } from 'react-native-logger';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Modal from 'react-native-simple-modal';

import ProfileCard from '../components/ProfileCard'
import IconList from '../components/IconList'
import * as actions from '../actions';
import { styles, colors } from '../config/styles';


class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, modalContent } = this.props;

    return (
      <Modal
        open={this.props.modalVisible}
        modalDidOpen={() => logger.log('modal did open')}
        modalDidClose={() => actions.hideModal()}>
        <View style={styles.flexZero}>
          <ProfileCard modalContent={modalContent} />
          <IconList modalContent={modalContent} />
          <Icon
            name='times'
            type='font-awesome'
            color={colors.primary1}
            onPress={() => actions.hideModal()}
          />
       </View>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  modalVisible: PropTypes.bool,
  actions: PropTypes.object,
  modalContent: PropTypes.object
};

// redux state to props mapper
function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    modalContent: state.modal.modalContent,
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
)(ProfileModal);
