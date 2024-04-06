import { IURLData, RepoIssues } from 'appTypes/index';
import { axiosInstance } from 'utils/axios';

export const getNewIssues: (URLData: IURLData) => Promise<RepoIssues> = async (URLData) => {
  const { owner, repo } = URLData
  return axiosInstance
    .get(`${owner}/${repo}/issues?state=open&assignee=none`)
    .then((res) => res.data)
};

export const getInProgressIssues: (URLData: IURLData) => Promise<RepoIssues> = async (URLData) => {
  const { owner, repo } = URLData;
  return axiosInstance
    .get(`${owner}/${repo}/issues?state=open&assignee=*`)
    .then((res) => res.data)
};

export const getClosedIssues: (URLData: IURLData) => Promise<RepoIssues> = async (URLData) => {
  const { owner, repo } = URLData;
  return axiosInstance
    .get(`${owner}/${repo}/issues?state=closed&assignee=*`)
    .then((res) => res.data)
};


