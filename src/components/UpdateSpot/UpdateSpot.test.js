import React from 'react';
import UpdateSpot from './UpdateSpot';
import { shallow } from 'enzyme';
import { PlayListProvider } from '../../contexts/PlayListContext';
import '../../tests/config';

test('Smoke test UpdateSpot', () => {
  const context = {
    spots: {
      spots: []
    }
  };
  const thing = shallow(
    <PlayListProvider>
      <UpdateSpot />
    </PlayListProvider>,
    { context }
  );
  expect(thing.exists()).toBe(true);
});
