import { RepoIssues } from 'appTypes/index';
import { axiosInstance } from 'utils/axios';

export const getNewIssues: () => Promise<RepoIssues> = async () =>
  axiosInstance
    .get('facebook/react/issues?state=open&assignee=none')
    .then((res) => res.data);

export const getInProgressIssues: () => Promise<RepoIssues> = async () =>
  axiosInstance
    .get('facebook/react/issues?state=open&assignee=*')
    .then((res) => res.data);

export const getClosedIssues: () => Promise<RepoIssues> = async () =>
  axiosInstance
    .get('facebook/react/issues?state=closed&assignee=*')
    .then((res) => res.data);
