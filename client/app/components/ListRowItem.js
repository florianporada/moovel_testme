import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';


class ListRowItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>{this.props.name}</Text>
    );
  }
}

ListRowItem.propTypes = {
  name: PropTypes.string
};

export default ListRowItem;
