import React from 'react';
import RegistrationForm from './RegistrationForm';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test RegistrationForm', () => {
  const thing = shallow(<RegistrationForm/>)
  expect(thing.exists()).toBe(true);
});

