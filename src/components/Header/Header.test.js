import React from 'react';
import Header from './Header';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test Header', () => {
  const thing = shallow(<Header/>)
  expect(thing.exists()).toBe(true);
});
