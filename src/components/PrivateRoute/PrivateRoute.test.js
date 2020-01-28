import React from 'react';
import PrivateRoute from './PrivateRoute';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test PrivateRoute', () => {
  const thing = shallow(<PrivateRoute/>)
  expect(thing.exists()).toBe(true);
});

