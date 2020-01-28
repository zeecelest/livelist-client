import React from 'react';
import HotIn from './HotIn';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test HotIn', () => {
  const state = {
    list: []
  }
  const thing = shallow(<HotIn/>,{state}).dive({state})
  expect(thing.exists()).toBe(true);
});

