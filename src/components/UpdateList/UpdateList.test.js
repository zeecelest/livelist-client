import React from 'react';
import UpdateList from './UpdateList';
import { shallow } from 'enzyme';
import { PlayListProvider } from '../../contexts/PlayListContext';
import '../../tests/config';

test('Smoke test UpdateList', () => {
  let context = {
    setListId: (id) => {
      this.setState({ list_id: id });
    }
  };
  const thing = shallow(
    <PlayListProvider>
      <UpdateList match={{ params: { id: 1 } }} />
    </PlayListProvider>,
    {
      context: { context }
    }
  );
  expect(thing.exists()).toBe(true);
});
