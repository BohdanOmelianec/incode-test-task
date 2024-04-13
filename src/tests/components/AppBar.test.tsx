import { render, screen } from '@testing-library/react';
import AppBar from 'components/AppBar';

describe('AppBar', () => {
  test('Should render title with text "Kanban board"', () => {
    render(<AppBar />);

    const headerTitle = screen.getByRole('heading', {level: 1});
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent(/kanban board/i);
  });
});
