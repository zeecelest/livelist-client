import React from 'react';
import NewSpotForm from './NewSpotForm';
import { shallow } from 'enzyme';
import '../../tests/config';
import { PlayListProvider } from '../../contexts/PlayListContext';

test('Smoke test NewSpotForm', () => {
  const thing = shallow(
    <PlayListProvider>
      <NewSpotForm location={{ props: { list_id: 1 } }} />
    </PlayListProvider>
  );
  expect(thing.exists()).toBe(true);
});
