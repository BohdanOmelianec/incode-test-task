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
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localForage.setItem('repoName', newValue); // isUpdated is true to be able to fetch data in columnListSelector while first load.
      });
    },
  ],
});

export const columnListState = atom({
  key: 'columnListState',
  default: selector({
    key: 'columnListDefault',
    get: async ({ get }) => {
      console.log('here in column get')
      // const newList = await getAllIssues(get(repoNameState));
      // return newList;
      const storageValue: IColumns | null = await localForage.getItem(get(repoNameState));

      return storageValue ? storageValue : defaultList;
    },
  }),
  effects: [
    ({ onSet }) => {
      const saveToStorage = async (newValue: IColumns) => {
        const name: string | null = await localForage.getItem('repoName');
        if (name) {
          localForage.setItem(name, newValue)
          console.log('after setting to LF')
        }
      }
      onSet((newValue) => {
        saveToStorage(newValue); // isUpdated is true to be able to fetch data in columnListSelector while first load.
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

// export const columnListSelector = selector({
//   key: 'populatedColumnList',
//   get: async ({ get }) => {
//     const repoName = get(repoNameState); // Get current url that was entered in the input or stored in the localForage.
//     console.log(repoName)
//     const l = get(columnListState);
// //     // // If repoName is '' or wasn't updated from Input Block then return current list.
// //     if (!repoName) return defaultList;
//     const storageValue: IColumns | null = await localForage.getItem(repoName);
// console.log('after getting from LF')
//     // // If there is a value saved, then return it.
//     if (storageValue) {
//       console.log('in if')
//       return storageValue;
//     }
//     console.log('after if')
//     // Else fetch new list with given repoName and update localForage.
//     const newList = await getAllIssues(repoName);
//     localForage.setItem(repoName, newList);
//     return newList;
//   },
//   set: ({ get, set }, newValue) => {
//     // const repoName = get(repoNameState);
//     console.log('in setter', newValue)
//     // localForage.setItem(repoName, newValue);
//     set(columnListState, newValue);
//   },
// });
