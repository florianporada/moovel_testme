import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
       <View>
         <Text>Hello {this.props.name}!</Text>

         <TouchableHighlight onPress={() => {
           this._setModalVisible(false)
         }}>
           <Text>Hide Modal</Text>
         </TouchableHighlight>
       </View>
      </View>
    );
  }
}

ProfileCard.propTypes = {
  name: PropTypes.string,
};


export default ProfileCard;
