import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import PostList from './PostList';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockData = [
  {
    id: '146b8632-ab20-479c-a67d-3cd9f50231e8',
    title: 'in hac habitasse platea dictumst maecenas ut massa quis augue',
    publishDate: '2020-09-28T15:59:05Z',
    author: {
      name: 'Bunnie Mathey',
      avatar: 'https://robohash.org/quamnonet.jpg?size=50x50&set=set1',
    },
    summary:
      'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
    categories: [
      {
        id: '5ee1187a-26f3-4819-b710-ccd99efc94df',
        name: 'Surveys and Forms',
      },
      {
        id: 'dc431d44-e26e-4bec-a2bd-a8ba1cd8b95d',
        name: 'Digital Marketing',
      },
      {
        id: '0756ceeb-48d1-495a-9e47-8bdbc4a231d4',
        name: 'Platform News and Updates',
      },
      {
        id: 'b4f70697-928c-4838-8f34-3bf0fc101792',
        name: 'Tips and Best Practise',
      },
    ],
  },
  {
    id: '9dfb1c88-e2ef-4bb4-bf3e-78f7db0440b0',
    title: 'justo sit amet sapien dignissim vestibulum',
    publishDate: '2020-07-29T04:07:33Z',
    author: {
      name: 'Murielle Sommersett',
      avatar: 'https://robohash.org/estdoloribuscum.jpg?size=50x50&set=set1',
    },
    summary: 'Morbi a ipsum. Integer a nibh. In quis justo.',
    categories: [
      {
        id: '9f91e03a-1ec9-44b5-b264-76acdf10654c',
        name: 'Data Management',
      },
      {
        id: '96058229-6df5-45a3-9dcb-ce4e79b70c38',
        name: 'Surveys and Forms',
      },
      {
        id: '64e0f65b-016b-4910-8fef-bb77922aab43',
        name: 'Marketing Analytics',
      },
    ],
  },
];

const mockPagination = {
  totalItems: 2,
  currentPage: 1,
  pageSize: 9,
  totalPages: 1,
  startIndex: 0,
  endIndex: 2,
  pages: [1],
  lastPageIndex: 1,
  maxPages: 5,
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

test('Test for Post info card', () => {
  renderWithRouter(<Card post={mockData[0]} />);
  const titleElem = screen.getByText(mockData[0].title);
  expect(titleElem).toBeInTheDocument();
  expect(titleElem).toHaveTextContent(
    'in hac habitasse platea dictumst maecenas ut massa quis augue'
  );
  expect(titleElem).toHaveClass('text-2xl font-bold my-4 text-gray-800');

  const summaryElem = screen.getByText(mockData[0].summary);
  expect(summaryElem).toBeInTheDocument();
  expect(summaryElem).toHaveClass('text-md self-start my-4 text-gray-900');
});

test('Test for List of Posts', () => {
  // const history = createMemoryHistory();
  // history.push('/posts');
  const { container } = renderWithRouter(
    // <Router history={history}>
    <PostList list={mockData} pagination={mockPagination} />
    // </Router>
  );
  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent(mockData[0].title);
  expect(container).toHaveTextContent(mockData[1].title);
});
