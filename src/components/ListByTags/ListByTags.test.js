import React from 'react';
import ListByTags from './ListByTags';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test ListByTags', () => {
  const thing = shallow(<ListByTags lists={[]}/>)
  expect(thing.exists()).toBe(true);
});

