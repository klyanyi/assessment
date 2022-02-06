import { render, screen } from '@testing-library/react';

import Pagination from './Pagination';
import React from 'react';
import { getPagination } from '../../utils/getPagination';

const list = new Array(40);

test('Test for Pagination', () => {
  const setPagination = jest.fn;
  const pagination = getPagination(list.length);

  render(
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      list={list}
    />
  );

  const btns = screen.getAllByRole('button');
  expect(btns.length).toBe(pagination.pages.length + 2); // +2 for « and » buttons
  expect(btns[0]).toHaveTextContent('«');
  expect(btns[btns.length - 1]).toHaveTextContent('»');
  expect(btns[1]).toHaveClass(
    // active class
    'px-4 text-white bg-slate-400 rounded-full font-bold hover:cursor-auto'
  );
  expect(btns[2]).toHaveClass('px-4 text-slate-800');
});
