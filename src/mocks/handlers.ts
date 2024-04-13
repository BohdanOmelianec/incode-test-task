import { HttpResponse, http } from 'msw';

const defaultItems = [
  {
    id: 1,
    assignee: null,
    created_at: '2024-04-10T09:36:03Z',
    closed_at: null,
    title: 'Test issue1',
    number: 234,
    comments: 2,
    html_url: '/issue1',
  },
  {
    id: 2,
    assignee: null,
    created_at: '2024-04-10T09:36:03Z',
    closed_at: null,
    title: 'Test issue2',
    number: 235,
    comments: 5,
    html_url: '/issue2',
  },
];

export const handlers = [
  http.get('https://api.github.com/repos/facebook/testtest', () => {
    return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
  }),
  http.get('https://api.github.com/repos/*', () => {
    return new HttpResponse(JSON.stringify(defaultItems));
  }),
];
