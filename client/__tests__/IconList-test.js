import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import IconList from '../app/components/IconList';


it('renders correctly', () => {
  const tree = renderer.create(
    <IconList />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
