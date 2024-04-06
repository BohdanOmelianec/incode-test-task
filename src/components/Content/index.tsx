import React from 'react';
import { Layout, Spin } from 'antd';
import Columns from 'components/Columns';
import InputBlock from 'components/InputBlock';
import Navigation from 'components/Navigation';

function Content() {

  return (
    <Layout.Content className="content">
      <InputBlock />

      <Navigation />

      <React.Suspense fallback={<Spin fullscreen tip="Loading..." size='large' delay={700} />}>
        <Columns />
      </React.Suspense>
    </Layout.Content>
  );
}

export default Content;
