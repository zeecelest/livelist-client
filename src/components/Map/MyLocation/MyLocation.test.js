import React from 'react';
import MyLocation from './MyLocation';
import {shallow} from 'enzyme';
import '../../../tests/config'

test('Smoke test MyLocation', () => {
  const thing = shallow(<MyLocation/>)
  expect(thing.exists()).toBe(true);
});

