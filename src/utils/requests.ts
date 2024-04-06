import { axiosInstance } from 'utils/axios';

export const getNewIssues = async () =>
  axiosInstance
    .get('facebook/react/issues?state=open&assignee=none')
    .then((res) => res.data);

export const getInProgressIssues = async () =>
  axiosInstance
    .get('facebook/react/issues?state=open&assignee=*')
    .then((res) => res.data);

export const getClosedIssues = async () =>
  axiosInstance
    .get('facebook/react/issues?state=closed&assignee=*')
    .then((res) => res.data);
