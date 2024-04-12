import { render, screen } from '@testing-library/react';
import Navigation from 'components/Navigation';
import { RecoilRoot } from 'recoil';
import { repoNameState } from 'atoms';

describe('Navigation', () => {
  it('Should render with correct links', async () => {
    const link = 'https://github.com/facebook/react';
    const separatedLinks = [
      '',
      'https://github.com/facebook',
      'https://github.com/facebook/react',
    ];
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(repoNameState, link)}>
        <Navigation />
      </RecoilRoot>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', separatedLinks[index]);
    });
  });

  it('Should render default link if repoName is empty', async () => {
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(repoNameState, '')}>
        <Navigation />
      </RecoilRoot>
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '');
  });
});
