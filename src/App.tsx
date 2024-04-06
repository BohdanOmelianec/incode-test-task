import React from 'react';
import { Layout } from 'antd';
import Content from './components/Content';
const { Header } = Layout;

function App() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
      </Header>

      <Content />
    </Layout>
  );
}

export default App;
