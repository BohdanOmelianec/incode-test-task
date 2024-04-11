import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBlock from '../../src/components/InputBlock';

describe('Testing InputBlock', () => {
  const getNewItems = vi.fn();
  const renderInput = (text?: string) => {
    if (text) {
      render(<InputBlock repoName={text} getNewItems={getNewItems} />);
    } else {
      render(<InputBlock getNewItems={getNewItems} />);
    }

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    return {
      inputElement,
      buttonElement,
    };
  };
  test('Should render input with text and button is unabled', async () => {
    const { inputElement, buttonElement } = renderInput('repository');

    expect(inputElement).toHaveAttribute('value', 'repository');
    expect(buttonElement).toBeEnabled();
  });

  test("Should render input with empty string if repoName wasn't provided and button is disabled", async () => {
    const { inputElement, buttonElement } = renderInput();

    expect(inputElement).toHaveAttribute('value', '');
    expect(buttonElement).toBeDisabled();
  });

  test('Should show an error if input value is invalid', async () => {
    const { inputElement, buttonElement } = renderInput();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(inputElement, 'test');
      userEvent.click(buttonElement);
    });

    const errorElement = screen.getByText('URL must be as');
    expect(errorElement).toBeInTheDocument();
  });
});
