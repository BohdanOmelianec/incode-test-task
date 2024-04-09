import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import Navigation from '.';

const MockNavigation = () => (
  <RecoilRoot>
    <Navigation />
  </RecoilRoot>
)
describe('Testing Navigation component', () => {
  fit('Should render navigation', async () => {
    render(<MockNavigation />);
    const breadcrumbComponent = await screen.findByRole('navigation');

    expect(breadcrumbComponent).toBeInTheDocument();
  });
});
