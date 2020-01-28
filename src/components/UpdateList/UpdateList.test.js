import React from 'react';
import UpdateList from './UpdateList';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test UpdateList', () => {
  const thing = shallow(<UpdateList match={{params:{id:1}}}/>)
  expect(thing.exists()).toBe(true);
});

