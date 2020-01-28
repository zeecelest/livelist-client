import React from 'react';
import LoginForm from './LoginForm';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test LoginForm', () => {
  const thing = shallow(<LoginForm/>)
  expect(thing.exists()).toBe(true);
});

