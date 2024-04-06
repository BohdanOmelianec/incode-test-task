import React, { useEffect } from 'react';
import { Breadcrumb, Layout } from 'antd';
import Columns from 'components/Columns';
import { getInProgressIssues } from 'utils/requests';
import InputBlock from 'components/InputBlock';

function Content() {
  useEffect(() => {
    getInProgressIssues().then((res) => console.log(res));
  }, []);
  return (
    <Layout.Content className="content">
      <InputBlock />

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
