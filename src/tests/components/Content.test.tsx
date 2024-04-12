import { render, screen } from '@testing-library/react';
import Content from 'components/Content';
import { RecoilRoot } from 'recoil';

describe('Content', () => {
  test('should render without errors', () => {
    render(
      <RecoilRoot>
        <Content />
      </RecoilRoot>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
