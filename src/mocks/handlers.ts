import { HttpResponse, http } from 'msw';

const defaultItems = [
  {
    id: 1,
    assignee: null,
    created_at: '2024-04-14T07:29:46Z',
    closed_at: null,
    title: 'Test issue0',
    number: 234,
    comments: 2,
    html_url: '/issue0',
  },
  {
    id: 2,
    assignee: null,
    created_at: '2024-04-14T07:29:46Z',
    closed_at: null,
    title: 'Test issue1',
    number: 235,
    comments: 5,
    html_url: '/issue1',
  },
];

export const handlers = [
  // Handler for negative case
  http.get('https://api.github.com/repos/test/test/*', () => {
    return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
  }),
  // Handler for successfull case
  http.get('https://api.github.com/repos/facebook/react/*', () => {
    return new HttpResponse(JSON.stringify(defaultItems));
  }),
];
