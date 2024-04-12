import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { server } from '../../mocks/server';
import Columns from 'components/Columns';
import { repoNameState } from 'atoms/index';

describe('Columns', () => {
  const headingRegExp = [/todo/i, /in progress/i, /done/i];
  const link = 'https://github.com/facebook/react';

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should render with correct title and droppable-id', async () => {
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(repoNameState, link)}>
        <Columns />
      </RecoilRoot>
    );

    const headings = await screen.findAllByRole('heading', { level: 3 });
    const columns = await screen.findAllByRole('column');

    expect(headings).toHaveLength(3);
    headings.forEach((title, index) => {
      expect(title).toHaveTextContent(headingRegExp[index]);
    });

    expect(columns).toHaveLength(3);
    columns.forEach((column, index) => {
      expect(column).toHaveAttribute('data-rbd-droppable-id', `${index}`);
    });
  });
});
