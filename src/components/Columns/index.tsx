import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, notification } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import { repoNameState } from 'atoms';
import ColumnTitle from 'components/ColumnTitle';
import IssueCard from 'components/IssueCard';
import { moveItem, reorderList } from 'utils/helpers';
import { defaultList, getAllIssues } from 'utils/requests';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#d5d5d5' : '',
});

function Columns() {
  const repoName = useRecoilValue(repoNameState);
  const [columnList, setColumnList] = useState(defaultList);
  const [loading, setLoading] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    (async () => {
      if (repoName) {
        setLoading(true);
        const { data, error } = await getAllIssues(repoName);

        if (data) {
          setColumnList(data);
        } else {
          notificationApi.open({
            type: 'error',
            message: `Error: ${error}`,
            duration: 4,
            placement: 'bottomRight',
          });
        }

        setLoading(false);
      }
    })();
  }, [repoName, notificationApi]);

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
  };

  return (
    <Row gutter={16}>
      {contextHolder}
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
      <Spin spinning={loading} fullscreen size="large" tip="Loading" />
    </Row>
  );
}

export default Columns;
