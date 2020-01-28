import React from 'react';
import NewPlaylistForm from './NewPlaylistForm';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test NewPlaylistForm', () => {
  const thing = shallow(<NewPlaylistForm/>)
  expect(thing.exists()).toBe(true);
});
