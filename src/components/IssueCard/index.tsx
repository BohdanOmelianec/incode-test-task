import React from 'react';
import { Card } from 'antd';

function IssueCard() {
  return (
    <Card title="Issue title" bordered={false} draggable hoverable>
      <p>Issue number</p>
      <p>Asiggnee</p>
    </Card>
  );
}

export default IssueCard;
