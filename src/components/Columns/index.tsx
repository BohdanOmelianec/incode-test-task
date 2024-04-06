import React from 'react';
import { Row, Col } from 'antd';
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import ColumnTitle from '../ColumnTitle';
import IssueCard from '../IssueCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { columnListState, populatedColumnList } from 'atoms';
import { moveItem, reorderList } from 'utils/helpers';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#d5d5d5' : '',
});

function Columns() {
  const setColumnList = useSetRecoilState(columnListState);
  const populatedList = useRecoilValue(populatedColumnList);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorderList(populatedList[sInd].items, source.index, destination.index);
      const columnListClone = [...populatedList];
      columnListClone[sInd].items = items;
      setColumnList(columnListClone);
    } else {
      const result = moveItem(populatedList, source, destination);
      setColumnList(result.filter((group) => group.items.length));
    }
  }

  return (
    <Row gutter={16}>
      <DragDropContext onDragEnd={onDragEnd}>
        {populatedList.map((column, index) => (
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
                  {column.items.map((item, index) => (
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
