import { atom, selector } from 'recoil';
import { breadcrumbsCreator } from '../utils/helpers';

export const repoNameState = atom({
  key: 'repoNameState',
  default: '',
});

export const breadcrumbLinksState = selector({
  key: 'breadcrumbLinks',
  get: ({ get }) => {
    const repoURL = get(repoNameState);

    return breadcrumbsCreator(repoURL);
  },
});
