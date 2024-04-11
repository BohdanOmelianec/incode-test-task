import { render, screen } from '@testing-library/react';
import AppBar from '../../src/components/AppBar';

describe('AppBar', () => {
  it('Should render title with text "Kanban board"', () => {
    render(<AppBar />);

    const headerTitle = screen.getByRole('heading');
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent(/kanban board/i);
  });
});
