import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import AppBar from '.';


describe('Testing AppBar', () => {
  test('Should render corectly', () => {
    render(<AppBar/>);
    const headerTitle = screen.getByText('Kanban board');
    expect(headerTitle).toBeInTheDocument();
  });
});
