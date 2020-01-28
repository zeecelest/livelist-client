import React from 'react';
import AutoComplete from './AutoComplete';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test AutoComplete', () => {
  const thing = shallow(<AutoComplete/>)
  expect(thing.exists()).toBe(true);
});
