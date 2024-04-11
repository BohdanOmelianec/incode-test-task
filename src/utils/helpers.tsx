import { DraggableLocation } from 'react-beautiful-dnd';
import { HomeOutlined, UserOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { IColumns, IURLData, Links, RepoIssues } from 'appTypes';

export const URLDataExtractor: (url: string) => IURLData = (url) => {
  const regExp = /(https:\/\/)*github.com\//;
  const URLDataArray = url.replace(regExp, '').split('/');
  const URLData = {
    owner: URLDataArray[0],
    repo: URLDataArray[1],
  };

  return URLData;
};

export const defaultLinks: Links = [
  {
    href: '',
    title: <HomeOutlined />,
  },
];
export const breadcrumbsCreator = (url: string): Links => {
  if (!url) {
    return defaultLinks;
  }

  const { href, pathname } = new URL(url);
  const [ownerName, repoName] = pathname.split('/').filter((l) => l);
  const owner = href.slice(0, href.lastIndexOf('/'));

  const links = [
    ...defaultLinks,
    {
      href: owner,
      title: (
        <>
          <UserOutlined />
          <span>{capitalizeFirstLetter(ownerName)}</span>
        </>
      ),
    },
    {
      href: href,
      title: (
        <>
          <FolderOpenOutlined />
          <span>{capitalizeFirstLetter(repoName)}</span>
        </>
      ),
    },
  ];

  return links;
};

export const capitalizeFirstLetter = (word: string) =>
  word.replace(/\b([a-z])/g, (match) => match.toUpperCase());

export const reorderList = (list: RepoIssues, startIndex: number, endIndex: number) => {
  if (
    !(startIndex >= 0 && startIndex <= list.length) ||
    !(endIndex >= 0 && endIndex <= list.length)
  )
    return list;
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
  const columnListClone = JSON.parse(JSON.stringify(columnList));
  // const columnListClone = structuredClone(columnList); structuredClone raises an Error (ReferenceError: structuredClone is not defined) while testing
  const sourceClone = columnListClone[+droppableSource.droppableId].items;
  const destClone = columnListClone[+droppableDestination.droppableId].items;

  const [removed] = sourceClone.splice(+droppableSource.index, 1);
  destClone.splice(+droppableDestination.index, 0, removed);

  columnListClone[+droppableSource.droppableId].items = sourceClone;
  columnListClone[+droppableDestination.droppableId].items = destClone;

  return columnListClone;
};
