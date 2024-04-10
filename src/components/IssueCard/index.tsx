import React, { CSSProperties } from 'react';
import { Avatar, Card, Divider, Flex, Typography } from 'antd';
import { Draggable, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { RepoIssue } from 'appTypes';

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableProvidedDraggableProps["style"]): CSSProperties => ({
  background: isDragging ? '#4096ff2b' : '',
  backdropFilter: 'blur(5px)',
  marginBottom: '16px',
  fontWeight: 500,
  color: 'gray',
  ...draggableStyle,
});

interface Props {
  item: RepoIssue;
  index: number;
}
function IssueCard({ item, index }: Props) {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <a
          href={item.html_url}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block' }}
        >
          <Card
            bordered={false}
            hoverable
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            <Typography.Title level={5}>{item.title}</Typography.Title>
            <Divider style={{ marginBlock: '8px' }} />
            <Flex vertical gap={8}>
              <Flex gap={8} align="center" wrap="wrap">
                <span>#{item.number}</span>
                {item.closed_at ? (
                  <span>Closed at {new Date(item.closed_at).toLocaleDateString()}</span>
                ) : (
                  <span>Opened at {new Date(item.created_at).toLocaleDateString()}</span>
                )}
              </Flex>

              {item.assignee && (
                <Flex gap={8} align="center" wrap="wrap">
                  <span>Assignee</span>
                  <Flex gap={8} align='center'>
                    <Avatar src={item.assignee.avatar_url} alt="avatar" />{" "} 
                    <span>{item.assignee.login}</span>
                  </Flex>
                </Flex>
                
              )}

              <span>Comments {item.comments}</span>
            </Flex>
          </Card>
        </a>
      )}
    </Draggable>
  );
}

export default IssueCard;
