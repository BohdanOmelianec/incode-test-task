
export interface ColumnItem {
  id: string;
  content: string;
}

export interface IColumn {
  title: string;
  items: ColumnItem[];
}

export type IColumns = IColumn[];

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
}

export type RepoIssues = RepoIssue[];