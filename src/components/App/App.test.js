import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test App', () => {
  const thing = shallow(<App/>)
  expect(thing.exists()).toBe(true);
});
