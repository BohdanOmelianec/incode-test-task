import React, { CSSProperties } from 'react';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnItem } from 'appTypes';

const getItemStyle = (isDragging: boolean, draggableStyle: any): CSSProperties => ({
  background: isDragging ? '#4096ff2b' : '',
  backdropFilter: 'blur(5px)',
  marginBottom: '16px',
  ...draggableStyle,
});

interface Props {
  item: ColumnItem,
  index: number;
}
function IssueCard({ item, index }: Props) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Card
          title="Issue title"
          bordered={false}
          hoverable
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <p>{item.content}</p>
          <p>Issue number</p>
          <p>Asiggnee</p>
        </Card>
      )}
    </Draggable>
  );
}

export default IssueCard;
