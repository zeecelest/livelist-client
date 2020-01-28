import React from 'react';
import LandingPage from './LandingPage';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test LandingPage', () => {
  const thing = shallow(<LandingPage/>)
  expect(thing.exists()).toBe(true);
});

