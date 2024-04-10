import { render, screen } from '@testing-library/react';

import ColumnTitle from '../../src/components/ColumnTitle';


describe('AppBar', () => {
  const text = 'ToDo';
  it('Should render title correctly', () => {
    render(<ColumnTitle title={text} />);

    const columnTitle = screen.getByRole('heading');
    expect(columnTitle).toHaveTextContent(text);
  });
});
