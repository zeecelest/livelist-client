import React from 'react';
import PublicOnlyRoute from './PublicOnlyRoute';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test PublicOnlyRoute', () => {
  const thing = shallow(<PublicOnlyRoute/>)
  expect(thing.exists()).toBe(true);
});

