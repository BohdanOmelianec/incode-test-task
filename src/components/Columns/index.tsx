import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { columnListSelector, repoNameState } from 'atoms';
import ColumnTitle from 'components/ColumnTitle';
import IssueCard from 'components/IssueCard';
import { moveItem, reorderList } from 'utils/helpers';
import { getAllIssues } from 'utils/requests';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#d5d5d5' : '',
});

function Columns() {
  const repoName = useRecoilValue(repoNameState);
  const [columnList, setColumnList] = useRecoilState(columnListSelector);

  useEffect(() => {
    (async () => {
      if (repoName) {
        const list = await getAllIssues(repoName);
        if (list) setColumnList(list);
      }
    })();
  }, [repoName, setColumnList]);

  const onDragEnd = (result: DropResult) => {
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
                role="column"
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
