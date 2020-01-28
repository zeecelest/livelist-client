import React from 'react';
import Spot from './Spot';
import { shallow } from 'enzyme';
import '../../tests/config';

const userListIds = [1, 2, 3, 4, 5];

test('Smoke test Spot', () => {
  const thing = shallow(<Spot usersListIds={userListIds} sid={1} />);

  expect(thing.exists()).toBe(true);
});
