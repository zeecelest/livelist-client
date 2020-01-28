import React from 'react';
import NewSpotForm from './NewSpotForm';
import {shallow} from 'enzyme';
import '../../tests/config'

test('Smoke test NewSpotForm', () => {
  const context = {
    setListId: ()=>{}
  }
  const thing = shallow(<NewSpotForm location={{props:{list_id: 1}}}

  />, {context})
  expect(thing.exists()).toBe(true);
});
