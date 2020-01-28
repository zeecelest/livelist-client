import React from 'react';
import UpdateSpot from './UpdateSpot';
import {shallow} from 'enzyme';
import '../../tests/config';

test('Smoke test UpdateSpot', () => {
  const context = {
    spots: {
      spots: [],
    },
  };
  const thing = shallow(<UpdateSpot />, {context});
  expect(thing.exists()).toBe(true);
});
