import { atom, selector } from 'recoil';
import { breadcrumbsCreator } from 'utils/helpers';
import { getAllIssues } from 'utils/requests';
import { IColumns } from 'appTypes/index';
import localForage from 'localforage';

const defaultList: IColumns = [
  { title: 'ToDo', items: [] },
  { title: 'In Progress', items: [] },
  { title: 'Done', items: [] },
];

export const repoNameState = atom({
  key: 'repoNameState',
  default: selector({
    key: 'repoNameDefault',
    get: async () => {
      const storageValue: string | null = await localForage.getItem('repoName');
      return storageValue ? storageValue : '';
    },
  }),
});

export const columnListState = atom({
  key: 'columnListState',
  default: selector({
    key: 'columnListDefault',
    get: async ({ get }) => {
      const newList = await getAllIssues(get(repoNameState));
      return newList ? newList : defaultList;
    },
  }),
  effects: [
    ({ onSet }) => {
      const saveToStorage = async (newValue: IColumns) => {
        const repoName: string | null = await localForage.getItem('repoName');

        if (repoName) {
          localForage.setItem(repoName, newValue);
        }
      }
      onSet((newValue) => {
        saveToStorage(newValue);
      });
    },
  ],
});

export const breadcrumbLinksState = selector({
  key: 'breadcrumbLinks',
  get: ({ get }) => {
    const repoURL = get(repoNameState);

    return breadcrumbsCreator(repoURL);
  },
});
