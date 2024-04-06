import React from 'react';
import { Breadcrumb, Layout, Spin } from 'antd';
import Columns from 'components/Columns';
import InputBlock from 'components/InputBlock';

function Content() {

  return (
    <Layout.Content className="content">
      <InputBlock />

      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <React.Suspense fallback={<Spin fullscreen tip="Loading..." size='large' delay={700} />}>
        <Columns />
      </React.Suspense>
    </Layout.Content>
  );
}

export default Content;
