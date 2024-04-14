import { render, screen } from '@testing-library/react';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('App flow', () => {
  const user = userEvent.setup();

  test('should render error notification if request is failed', async () => {
    const invalidLink = 'https://github.com/test/test';
    render(<App />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /load issues/i });
    const loadingElement = await screen.findByText(/loading/i);

    // Enter invalid link for GitHub repository
    await user.clear(inputElement);
    await user.type(inputElement, invalidLink);
    await user.click(buttonElement);

    expect(inputElement).toHaveValue(invalidLink);
    expect(loadingElement).toBeInTheDocument();

    // Check if error notification arrears
    const errorElement = await screen.findByRole('alert');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(/error/i);
  });
});
