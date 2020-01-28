import React from 'react';
import HotIn from './HotIn';
import { shallow } from 'enzyme';
import { PlayListProvider } from '../../contexts/PlayListContext';
import '../../tests/config';

test('Smoke test HotIn', () => {
  const state = {
    allList: [],
    usersLists: []
  };
  const thing = shallow(
    <PlayListProvider>
      <HotIn userList={state.userList} allLists={state.lists} />
    </PlayListProvider>,
    { state }
  ).dive({ state });
  expect(thing.exists()).toBe(true);
});
