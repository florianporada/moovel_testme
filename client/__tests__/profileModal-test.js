import React from 'react';
import { shallow } from 'enzyme';
import mockStore from 'redux-mock-store';

// imported as a connected component!
import App from '../app/container/app';

const initialState = {
  preferences: {
    modalContent: {
      "avatar_url": "https://avatars0.githubusercontent.com/u/39191?v=4",
      "bio": null,
      "blog": "http://paulirish.com",
      "company": "Google Chrome, ♥z",
      "created_at": "2008-12-09T00:39:23Z",
      "email": null,
      "events_url": "https://api.github.com/users/paulirish/events{/privacy}",
      "followers": 24331,
      "followers_url": "https://api.github.com/users/paulirish/followers",
      "following": 244,
      "following_url": "https://api.github.com/users/paulirish/following{/other_user}",
      "gists_url": "https://api.github.com/users/paulirish/gists{/gist_id}",
      "gravatar_id": "",
      "hireable": null,
      "html_url": "https://github.com/paulirish",
      "id": 39191,
      "location": "Palo Alto",
      "login": "paulirish",
      "name": "Paul Irish",
      "organizations_url": "https://api.github.com/users/paulirish/orgs",
      "public_gists": 109,
      "public_repos": 242,
      "received_events_url": "https://api.github.com/users/paulirish/received_events",
      "repos_url": "https://api.github.com/users/paulirish/repos",
      "site_admin": false,
      "starred_url": "https://api.github.com/users/paulirish/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/paulirish/subscriptions",
      "type": "User",
      "updated_at": "2017-09-11T21:30:35Z",
      "url": "https://api.github.com/users/paulirish",
    },
    modalVisible: true,
  },
};

describe('Testing profile Modal', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <App />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
