import { atom, selector } from 'recoil';
import { breadcrumbsCreator } from '../utils/helpers';
import { IColumns } from 'appTypes/index';
import localForage from 'localforage';

const defaultList: IColumns = [
  { title: 'ToDo', items: [] },
  { title: 'In Progress', items: [] },
  { title: 'Done', items: [] },
];

export const repoNameState = atom({
  key: 'repoNameState',
  default: '',
});

export const columnListState = atom({
  key: 'columnListState',
  default: defaultList,
});

export const columnListSelector = selector({
  key: 'columnListSelector',
  get: ({ get }) => get(columnListState),
  set: ({ set, get }, newValue) => {
    const repoName = get(repoNameState);

    if (repoName) {
      set(columnListState, newValue);
      localForage.setItem(repoName, newValue);
      localForage.setItem('repoName', repoName);
    }
  },
});

export const breadcrumbLinksState = selector({
  key: 'breadcrumbLinks',
  get: ({ get }) => {
    const repoURL = get(repoNameState);

    return breadcrumbsCreator(repoURL);
  },
});
