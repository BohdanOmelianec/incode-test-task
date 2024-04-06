import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Input, Button, Flex } from 'antd';
import Columns from 'components/Columns';
import { getInProgressIssues } from 'utils/requests';

function Content() {
  useEffect(() => {
    getInProgressIssues()
    .then(res => console.log(res))
  }, [])
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
