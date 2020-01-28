import React from 'react';
import Fire from './Fire';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test Fire', () => {
  const thing = shallow(<Fire/>)
  expect(thing.exists()).toBe(true);
});
