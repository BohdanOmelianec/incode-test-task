import { IColumns, IURLData, RepoIssues } from "appTypes";
import { DraggableLocation } from "react-beautiful-dnd";

export const URLDataExtractor: (url: string) => IURLData = (url) => {
  const URLDataArray = url.replace('https://github.com/', '').split('/');
  const URLData = {
    owner: URLDataArray[0],
    repo: URLDataArray[1],
  };

  return URLData;
};

export const reorderList = (list: RepoIssues, startIndex: number, endIndex: number) => {
  const listClone = [...list];
  const [removed] = listClone.splice(startIndex, 1);
  listClone.splice(endIndex, 0, removed);

  return listClone;
};

export const moveItem = (
  columnList: IColumns,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): IColumns => {
  const columnListClone = [...columnList];
  const sourceClone = columnListClone[+droppableSource.droppableId].items;
  const destClone = columnListClone[+droppableDestination.droppableId].items;

  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  columnListClone[+droppableSource.droppableId].items = sourceClone;
  columnListClone[+droppableDestination.droppableId].items = destClone;

  return columnListClone;
};