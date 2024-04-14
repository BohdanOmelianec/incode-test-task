import { IColumns, IURLData, RepoIssues } from 'appTypes/index';
import { axiosInstance } from './axios';
import { URLDataExtractor } from './helpers';
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
  // return Promise.resolve([])
  return axiosInstance
    .get(`${owner}/${repo}/issues?per_page=10&state=open&assignee=*`)
    .then((res) => res.data);
};

export const getClosedIssues: (URLData: IURLData) => Promise<RepoIssues> = async (
  URLData
) => {
  const { owner, repo } = URLData;
  // return Promise.resolve([])
  return axiosInstance
    .get(`${owner}/${repo}/issues?per_page=10&state=closed&assignee=*`)
    .then((res) => res.data);
};

type ReturnedValue = { data?: IColumns; error?: string };

export const getAllIssues = async (repoURL: string): Promise<ReturnedValue> => {
  if (!repoURL) return { data: defaultList };

  // Checking value in a storage before making a request
  const storageValue: IColumns | null = await localForage.getItem(repoURL);

  if (storageValue) {
    return { data: storageValue };
  }

  // Otherwise make a GET request to get list of issues for particular repo
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

      // Saving data to the storage
      localForage.setItem(repoURL, newList);
      localForage.setItem('repoName', repoURL);
      return { data: newList };
    })
    .catch((err) => {
      return { error: err?.response?.data?.message || 'Data not found' };
    });
};

export const getRepoName = async () => {
  const storageValue: string | null = await localForage.getItem('repoName');
  return storageValue ? storageValue : '';
};
