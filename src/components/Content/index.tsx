import React from 'react';
import { Layout } from 'antd';
import Columns from 'components/Columns';
import InputBlock from 'components/InputBlock';
import Navigation from 'components/Navigation';

function Content() {
  return (
    <Layout.Content className="content">
      <InputBlock />
      <Navigation />
      <Columns />
    </Layout.Content>
  );
}

export default Content;
