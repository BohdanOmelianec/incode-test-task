import React from 'react';
import { Flex, Layout, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { Header } = Layout;

function AppBar() {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Flex style={{ fontSize: 24, color: 'white' }} gap={16} align="center">
        <GithubOutlined />
        <Typography.Title
          level={1}
          style={{ margin: 0, color: 'inherit', fontSize: 24, fontWeight: 500 }}
        >
          Kanban board
        </Typography.Title>
      </Flex>
    </Header>
  );
}

export default AppBar;
