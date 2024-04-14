import { logRoles, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Columns from 'components/Columns';
import { repoNameState } from 'atoms/index';

describe('Columns', () => {
  const headingRegExp = [/todo/i, /in progress/i, /done/i];
  const link = 'https://github.com/facebook/react';

  test('Should render with correct title and droppable-id', async () => {
    const { container } = render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(repoNameState, link)}>
        <Columns />
      </RecoilRoot>
    );

    const headings = screen.getAllByRole('heading', { level: 3 });
    const columns = screen.getAllByRole('column');

    expect(headings).toHaveLength(3);
    headings.forEach((title, index) => {
      expect(title).toHaveTextContent(headingRegExp[index]);
    });

    expect(columns).toHaveLength(3);
    columns.forEach((column, index) => {
      expect(column).toHaveAttribute('data-rbd-droppable-id', `${index}`);
    });

    const links = await screen.findAllByRole('link');
    expect(links).toHaveLength(6);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/issue${index % 2 ? 1 : 0}`);
      expect(link).toHaveTextContent(`Test issue${index % 2 ? 1 : 0}`);
    });

    logRoles(container);
  });
});
