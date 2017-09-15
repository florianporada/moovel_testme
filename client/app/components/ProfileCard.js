import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';
import { styles } from '../config/styles';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hideModal, modalContent } = this.props.actions;

    return (
      <View>
       <View style={styles.profileModal}>
         <Text>Hello {modalContent.login}!</Text>

         <TouchableHighlight onPress={() => {
           hideModal();
         }}>
           <Text>Hide Modal</Text>
         </TouchableHighlight>
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
