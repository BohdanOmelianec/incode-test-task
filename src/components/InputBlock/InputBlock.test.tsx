import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputBlock from '.';
import { RecoilRoot } from 'recoil';


const MockInputBlock = () => (
  <RecoilRoot>
    <InputBlock />
  </RecoilRoot>
);

describe('Testing InputBlock', () => {
  test('Should render input', async () => {
    render(<MockInputBlock />);
    const inputElement = await screen.findByPlaceholderText('Enter repo URL');

    expect(inputElement).toBeInTheDocument();
  });

  test('Should render disabled button', async () => {
    render(<MockInputBlock />);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent('LOAD ISSUES');
  });

  test("Button shouldn't be disabled when input isn't empty", async () => {
    render(<MockInputBlock />);
    const inputElement = await screen.findByPlaceholderText('Enter repo URL');
    const buttonElement = screen.getByRole('button');

    userEvent.type(inputElement, 'test');
    expect(inputElement).toHaveValue('test');
    expect(buttonElement).not.toBeDisabled();
  });

  test('Should show an error if input value is invalid', async () => {
    render(<MockInputBlock />);
    const inputElement = await screen.findByPlaceholderText('Enter repo URL');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, {target: {value: 'test'}});
    fireEvent.click(buttonElement);

    const errorElement = await screen.findByText('URL must be as');
    expect(errorElement).toBeInTheDocument();
  });
});
