import React from 'react';
import Button from './Button';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test Button', () => {
  const thing = shallow(<Button/>)
  expect(thing.exists()).toBe(true);
});
