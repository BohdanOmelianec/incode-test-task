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

interface RepoName {
  name: '';
  isUpdated: false;
}

export const repoNameState = atom({
  key: 'repoNameState',
  default: selector({
    key: 'repoNameDefault',
    get: async () => {
      const storageValue: RepoName | null = await localForage.getItem('repoName');
      return storageValue ? storageValue : { name: '', isUpdated: false };
    },
  }),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localForage.setItem('repoName', {...newValue, isUpdated: true}); // isUpdated is true to be able to fetch data in columnListSelector while first load.
      });
    },
  ],
});

export const columnListState = atom({
  key: 'columnListState',
  default: defaultList,
});

export const breadcrumbLinksState = selector({
  key: 'breadcrumbLinks',
  get: ({ get }) => {
    const repoURL = get(repoNameState);

    return breadcrumbsCreator(repoURL.name);
  },
});

export const columnListSelector = selector({
  key: 'populatedColumnList',
  get: async ({ get }) => {
    const repoName = get(repoNameState); // Get current url that was entered in the input or stored in the localForage.
    
    // If repoName is '' or wasn't updated from Input Block then return current list.
    if (!repoName.name || !repoName.isUpdated) return get(columnListState);
    const storageValue: IColumns | null = await localForage.getItem(repoName.name);

    // If there is a value saved, then return it.
    if (storageValue) {
      return storageValue;
    }
    // Else fetch new list with given repoName and update localForage.
    const newList = await getAllIssues(repoName.name);
    localForage.setItem(repoName.name, newList);
    return newList;
  },
  set: ({ get, set }, newValue) => {
    const repoName = get(repoNameState);
    set(columnListState, newValue);
    localForage.setItem(repoName.name, newValue);
    set(repoNameState, { ...get(repoNameState), isUpdated: false });
  },
});
