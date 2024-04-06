import { atom, selector } from 'recoil';
import { URLDataExtractor } from 'utils/helpers';
import { getClosedIssues, getInProgressIssues, getNewIssues } from 'utils/requests';
import { IColumns } from 'appTypes/index';
import { enqueueSnackbar } from 'notistack';

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


export const populatedColumnList = selector({
  key: 'populatedColumnList',

  get: async ({ get }) => {
    const name = get(repoNameState);
    const list = get(columnListState);

    if(name) {
      const URLData = URLDataExtractor(name);
      return Promise.all([getNewIssues(URLData), getInProgressIssues(URLData), getClosedIssues(URLData)])
      .then(([todo, inProgress, closed]) => {
        const columnList = [
          { title: 'ToDo', items: todo || [] },
          { title: 'In Progress', items: inProgress || [] },
          { title: 'Done', items: closed || [] },
        ];

        return columnList;
      })
      .catch(err => {
        console.log(err.response.data);
        enqueueSnackbar(err.response.data.message || 'Data not found', {variant: 'error'})
        return list
      })
  

    }
    return list
  }
});
