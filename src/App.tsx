import React from 'react';
import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';
import Content from './components/Content';
import AppBar from 'components/AppBar';

function App() {
  return (
    <RecoilRoot>
      <Layout style={{ height: '100%' }}>
        <AppBar />
        <Content />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
