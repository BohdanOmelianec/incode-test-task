import React, { useState } from 'react';
import { Row, Col } from 'antd';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import ColumnTitle from '../ColumnTitle';
import IssueCard from '../IssueCard';
import { IColumns, ColumnItem } from 'appTypes';

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}-${new Date().getTime()}-${Math.random()}`,
    content: `item-${k}`,
  }));

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#d5d5d5' : '',
});

const reorder = (list: ColumnItem[], startIndex: number, endIndex: number) => {
  const listClone = [...list];
  const [removed] = listClone.splice(startIndex, 1);
  listClone.splice(endIndex, 0, removed);

  return listClone;
};

const move = (
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

const defaultList: IColumns = [
  { title: 'ToDo', items: getItems(7) },
  { title: 'In Progress', items: getItems(3) },
  { title: 'Done', items: getItems(1) },
];

function Columns() {
  const [columnList, setColumnList] = useState<IColumns>(defaultList);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(columnList[sInd].items, source.index, destination.index);
      const columnListClone = [...columnList];
      columnListClone[sInd].items = items;
      setColumnList(columnListClone);
    } else {
      const result = move(columnList, source, destination);
      setColumnList(result.filter((group) => group.items.length));
    }
  }

  return (
    <Row gutter={16}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnList.map((column, index) => (
          <Droppable droppableId={`${index}`} key={index}>
            {(provided, snapshot) => (
              <Col
                sm={8}
                xl={7}
                className="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ColumnTitle title={column.title} />
                <div
                  className="column_content"
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {column.items.map((item: ColumnItem, index: number) => (
                    <IssueCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </Col>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Row>
  );
}

export default Columns;
