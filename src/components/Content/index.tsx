import React from 'react';
import { Breadcrumb, Layout, Input, Button, Flex } from 'antd';
import Columns from './Columns';

function Content() {
  return (
      <Layout.Content className='content'>
        <Flex gap={16}>
          <Input placeholder="Enter repo URL" />
          <Button type="primary">Load issues</Button>
        </Flex>

        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Columns />
      </Layout.Content>
  );
}

export default Content;
