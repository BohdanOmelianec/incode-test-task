import { IColumns, IURLData, RepoIssues } from 'appTypes/index';
import { axiosInstance } from 'utils/axios';
import { URLDataExtractor } from './helpers';
import { enqueueSnackbar } from 'notistack';
import localForage from 'localforage';

export const defaultList: IColumns = [
  { title: 'ToDo', items: [] },
  { title: 'In Progress', items: [] },
  { title: 'Done', items: [] },
];

export const getNewIssues: (URLData: IURLData) => Promise<RepoIssues> = async (
  URLData
) => {
  const { owner, repo } = URLData;
  return axiosInstance
    .get(`${owner}/${repo}/issues?per_page=10&state=open&assignee=none`)
    .then((res) => res.data);
};

export const getInProgressIssues: (URLData: IURLData) => Promise<RepoIssues> = async (
  URLData
) => {
  const { owner, repo } = URLData;
  return axiosInstance
    .get(`${owner}/${repo}/issues?per_page=10&state=open&assignee=*`)
    .then((res) => res.data);
};

export const getClosedIssues: (URLData: IURLData) => Promise<RepoIssues> = async (
  URLData
) => {
  const { owner, repo } = URLData;
  return axiosInstance
    .get(`${owner}/${repo}/issues?per_page=10&state=closed&assignee=*`)
    .then((res) => res.data);
};

export const getAllIssues = async (repoURL: string): Promise<IColumns | undefined> => {
  if (!repoURL) return defaultList;

  const storageValue: IColumns | null = await localForage.getItem(repoURL);

  if (storageValue) {
    return storageValue;
  }

  const URLData = URLDataExtractor(repoURL);
  return Promise.all([
    getNewIssues(URLData),
    getInProgressIssues(URLData),
    getClosedIssues(URLData),
  ])
    .then(([todo, inProgress, closed]) => {
      const newList = [
        { title: 'ToDo', items: todo || [] },
        { title: 'In Progress', items: inProgress || [] },
        { title: 'Done', items: closed || [] },
      ];

      return newList;
    })
    .catch((err) => {
      console.log(err.response.data);
      enqueueSnackbar(err.response.data.message || 'Data not found', {
        variant: 'error',
      });

      return undefined;
    });
};
