import { render, screen } from '@testing-library/react';

import CategoryFilter from './CategoryFilter';
import React from 'react';

const list = new Map();
list.set('Category 1', {
  id: 1,
  name: 'Category 1',
  posts: new Set([{ id: 'p1' }, { id: 'p2' }]),
});
list.set('Category 2', {
  id: 2,
  name: 'Category 2',
  posts: new Set([{ id: 'p1' }, { id: 'p3' }]),
});

test('Test for Pagination', () => {
  const onSelect = jest.fn;

  render(<CategoryFilter list={list} onSelect={onSelect} />);

  const labels = screen.getAllByRole('checkbox');
  expect(labels.length).toBe(list.size);
});
