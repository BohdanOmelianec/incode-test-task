// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  URLDataExtractor,
  breadcrumbsCreator,
  capitalizeFirstLetter,
  defaultLinks,
  moveItem,
  reorderList,
} from './helpers';
import { IColumns, RepoIssues } from 'appTypes/index';

const mockList = [
  {
    title: 'Column 1',
    items: [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' },
    ] as IColumns,
  },
  {
    title: 'Column 2',
    items: [{ title: 'Item 5' }, { title: 'Item 6' }],
  },
] as IColumns;

describe('Testing URLDataExtractor', () => {
  test('correctly extracts owner and repo from a standard GitHub URL', () => {
    const url = 'https://github.com/facebook/react';
    const expected = { owner: 'facebook', repo: 'react' };
    expect(URLDataExtractor(url)).toEqual(expected);
  });

  test('handles URL without https:// prefix', () => {
    const url = 'github.com/facebook/lexical';
    const expected = { owner: 'facebook', repo: 'lexical' };
    expect(URLDataExtractor(url)).toEqual(expected);
  });
});

describe('Testing breadcrumbsCreator', () => {
  test('Should return default links when url is falsy', () => {
    const url = '';
    const result = breadcrumbsCreator(url);
    expect(result).toEqual(defaultLinks);
  });

  test('Should return an array of links with length 3 when url is valid github link', () => {
    const url = 'https://github.com/rickhanlonii/suspense';
    const result = breadcrumbsCreator(url);
    expect(result.length).toBe(3);
  });
});

describe('Testing capitalizeFirstLetter', () => {
  test('Should return a string with the first letter capitalized when input is a string case 1', () => {
    const word = 'hello';
    const result = capitalizeFirstLetter(word);
    expect(result).toBe('Hello');
  });

  test('Should return a string with the first letter capitalized when input is a string case 2', () => {
    const word = 'teStINg';
    const result = capitalizeFirstLetter(word);
    expect(result).toBe('TeStINg');
  });

  test('Should return a string representation of number when input is a "3463"', () => {
    const word = '3463';
    const result = capitalizeFirstLetter(word);
    expect(result).toBe('3463');
  });
});

describe('Testing reorderList', () => {
  test('Should correctly swap items', () => {
    const list = mockList[0].items;
    const from = 1;
    const to = 3;
    const result = reorderList(list as RepoIssues, from, to);
    expect(result[to].title).toBe('Item 2');
  });

  test('Should return the same list if "from" or "to" are out of array length', () => {
    const list = mockList[0].items;
    const from = 2;
    const to = 5;
    const result = reorderList(list as RepoIssues, from, to);
    expect(result[from].title).toBe('Item 3');
  });
});

describe('Testing moveItem', () => {
  test('Should return a new columnList with the item moved from the source to the destination', () => {
    const droppableSource = {
      droppableId: '0',
      index: 1,
    };
    const droppableDestination = {
      droppableId: '1',
      index: 1,
    };

    const result = moveItem(mockList as IColumns, droppableSource, droppableDestination);

    expect(result).toEqual([
      {
        title: 'Column 1',
        items: [
          { title: 'Item 1' },
          { title: 'Item 3' },
          { title: 'Item 4' },
        ] as IColumns,
      },
      {
        title: 'Column 2',
        items: [{ title: 'Item 5' }, { title: 'Item 2' }, { title: 'Item 6' }],
      },
    ]);
  });

  test('Should throw an error when droppableSource is invalid', () => {
    const droppableSource = {
      droppableId: '3',
      index: 0,
    };
    const droppableDestination = {
      droppableId: '1',
      index: 1,
    };

    expect(() =>
      moveItem(mockList, droppableSource, droppableDestination)
    ).toThrowError();
  });
});
