import React from 'react';
import likeButton from './likeButton';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test LikeButton', () => {
  const thing = shallow(<likeButton/>)
  expect(thing.exists()).toBe(true);
});

