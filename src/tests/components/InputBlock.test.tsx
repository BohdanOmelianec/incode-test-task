import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBlock from 'components/InputBlock';
import { RecoilRoot } from 'recoil';

describe('Testing InputBlock', () => {
  const renderInput = () => {
    render(
      <RecoilRoot>
        <InputBlock />
      </RecoilRoot>
    );

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    return {
      inputElement,
      buttonElement,
    };
  };
  test('Button should be disabled if input is empty', async () => {
    const { inputElement, buttonElement } = renderInput();

    expect(inputElement).toHaveAttribute('value', '');
    expect(buttonElement).toBeDisabled();
  });

  test('Button should be enabled if input has some text in it', async () => {
    const { inputElement, buttonElement } = renderInput();

    expect(buttonElement).toBeDisabled();

    userEvent.type(inputElement, 'Test');

    expect(inputElement).toHaveAttribute('value', 'Test');
    expect(buttonElement).toBeEnabled();
  });

  test('Should show an error if input value is invalid', async () => {
    const { inputElement, buttonElement } = renderInput();

    userEvent.type(inputElement, 'Test');
    userEvent.click(buttonElement);

    const errorElement = await screen.findByText('URL must be as');
    expect(errorElement).toBeVisible();
  });
});
