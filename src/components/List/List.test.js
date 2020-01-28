import React from 'react';
import List from './List';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test List', () => {
  const thing = shallow(<List/>)
  expect(thing.exists()).toBe(true);
});

