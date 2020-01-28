import React from 'react';
import Map from './Map';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test Map', () => {
  const thing = shallow(<Map spots={[]}/>)
  expect(thing.exists()).toBe(true);
});

