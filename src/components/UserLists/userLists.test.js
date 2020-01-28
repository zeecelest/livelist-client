import React from 'react';
import UserLists from './userLists';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test UserLists', () => {
  const thing = shallow(<UserLists userList={[]}/>)
  expect(thing.exists()).toBe(true);
});

