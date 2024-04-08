import { DraggableLocation } from 'react-beautiful-dnd';
import { HomeOutlined, UserOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { IColumns, IURLData, RepoIssues } from 'appTypes';

export const URLDataExtractor: (url: string) => IURLData = (url) => {
  const URLDataArray = url.replace('https://github.com/', '').split('/');
  const URLData = {
    owner: URLDataArray[0],
    repo: URLDataArray[1],
  };

  return URLData;
};

const defaultLinks = [
  {
    href: '',
    title: <HomeOutlined />,
  },
];
export const breadcrumbsCreator = (url: string) => {
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
  word.slice(0, 1).toUpperCase() + word.slice(1);

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
  const columnListClone = structuredClone(columnList);
  const sourceClone = columnListClone[+droppableSource.droppableId].items;
  const destClone = columnListClone[+droppableDestination.droppableId].items;

  const [removed] = sourceClone.splice(+droppableSource.index, 1);
  destClone.splice(+droppableDestination.index, 0, removed);

  columnListClone[+droppableSource.droppableId].items = sourceClone;
  columnListClone[+droppableDestination.droppableId].items = destClone;

  return columnListClone;
};
