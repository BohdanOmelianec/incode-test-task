import React from 'react';
import { Row, Col } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import ColumnTitle from '../ColumnTitle';
import IssueCard from '../IssueCard';
import { useRecoilState } from 'recoil';
import { columnListSelector } from 'atoms';
import { moveItem, reorderList } from 'utils/helpers';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#d5d5d5' : '',
});

function Columns() {
  const [columnList, setColumnList] = useRecoilState(columnListSelector);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorderList(columnList[sInd].items, source.index, destination.index);
      const columnListClone = structuredClone(columnList);
      columnListClone![sInd].items = items;
      setColumnList(columnListClone);
    } else {
      const result = moveItem(columnList, source, destination);
      setColumnList(result);
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
                  {column.items.map((item, index) => (
                    <IssueCard key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
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
