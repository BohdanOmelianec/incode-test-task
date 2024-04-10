import { render, screen } from '@testing-library/react';
import Navigation from '../../src/components/Navigation';
import { Links } from 'appTypes/index';
// )
describe('Navigation', () => {
  const items: Links = [
    {href: '/facebook', title: 'Facebook'},
    {href: '/google', title: 'Google'},
  ]

  it('Should render with correct links', async () => {
    render(<Navigation items={items} />);

    items.forEach(item => {
      const link = screen.getByRole('link', { name: item.title as string });
      expect(link).toHaveAttribute('href', item.href);
    })
  });
});
