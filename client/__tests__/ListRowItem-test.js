import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ListRowItem from '../app/components/ListRowItem';

it('renders correctly', () => {
  const tree = renderer.create(
    <ListRowItem />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
