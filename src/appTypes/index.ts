
export interface ColumnItem {
  id: string;
  content: string;
}

export interface IColumn {
  title: string;
  items: ColumnItem[];
}

export type IColumns = IColumn[];