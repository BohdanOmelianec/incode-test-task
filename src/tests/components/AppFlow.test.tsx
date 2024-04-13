import {
  render,
  screen,
} from '@testing-library/react';
import App from '../../App';
import userEvent from '@testing-library/user-event';


describe('App flow', () => {
  test('should render all the elements', async () => {
    render(<App />);

    const headerTitle = screen.getByRole('heading', { level: 1 });
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /load issues/i });

    expect(headerTitle).toHaveTextContent(/kanban board/i);
    expect(inputElement).toHaveValue('');
    expect(buttonElement).toBeInTheDocument();
  });

  test.only('should render all dvsvsv elements', async () => {
    const invalidLink = 'https://github.com/facebook/testtest';
    render(<App />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /load issues/i });
    const loadingElement = await screen.findByText(/loading/i);

    userEvent.clear(inputElement);
    userEvent.type(inputElement, invalidLink);
    userEvent.click(buttonElement);

    expect(inputElement).toHaveValue(invalidLink);
    expect(loadingElement).toBeInTheDocument();
  });
});
