import React from 'react';
import { Row, Col } from 'antd';
import ColumnTitle from '../ColumnTitle';
import IssueCard from '../IssueCard';

function Columns() {
  return (
    <Row gutter={16}>
      <Col sm={8} xl={7} className="column">
        <ColumnTitle title="ToDo" />
        <div className="column_content">
          <IssueCard />
        </div>
      </Col>
      <Col sm={8} xl={7} className="column">
        <ColumnTitle title="In Progress" />
        <div className="column_content">
          <IssueCard />
        </div>
      </Col>
      <Col sm={8} xl={7} className="column">
        <ColumnTitle title="Done" />
        <div className="column_content">
          <IssueCard />
        </div>
      </Col>
    </Row>
  );
}

export default Columns;
