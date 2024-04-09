import React from 'react';
import { Flex, Layout } from 'antd';
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
      <Flex style={{ fontSize: 24, color: 'white', fontWeight: 500 }} gap={16}>
        <GithubOutlined />
        <span>Kanban board</span>
      </Flex>
    </Header>
  );
}

export default AppBar;
