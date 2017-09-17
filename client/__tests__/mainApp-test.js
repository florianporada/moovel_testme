import React from 'react';
import { shallow } from 'enzyme';
import mockStore from 'redux-mock-store';

// imported as a connected component!
import App from '../app/container/app';

const initialState = {
  preferences: {
    modalVisible: false,
  },
};

describe('Testing main App', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <App />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
