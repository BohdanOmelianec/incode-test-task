import React from 'react';
import { Typography } from 'antd';

interface Props {
  title: string;
}

function ColumnTitle({ title }: Props) {
  return (
    <Typography.Title level={3} style={{ textAlign: 'center' }}>
      {title}
    </Typography.Title>
  );
}

export default ColumnTitle;
