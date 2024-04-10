// Git Hub

export interface GHUser {
  id: number;
  avatar_url: string;
  login: string;
}

export interface RepoIssue {
  id: number;
  assignee: GHUser | null;
  created_at: string;
  closed_at: string | null;
  title: string;
  number: number;
  comments: number;
  html_url: string;
}

export type RepoIssues = RepoIssue[];

// List/Columns

export interface IColumn {
  title: string;
  items: RepoIssues;
}

export type IColumns = IColumn[];

// Other

export interface IURLData {
  owner: string;
  repo: string;
}

export interface Link {
  href: string;
  title: React.ReactNode;
}

export type Links = Link[];
