import React from 'react';
import Marker from './Marker';
import {shallow} from 'enzyme';
import '../../../tests/config'

test('Smoke test Marker', () => {
  const thing = shallow(<Marker/>)
  expect(thing.exists()).toBe(true);
});

