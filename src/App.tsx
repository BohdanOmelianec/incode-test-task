import React from 'react';
import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import Content from './components/Content';
const { Header } = Layout;

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <RecoilRoot>
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
      </RecoilRoot>
    </SnackbarProvider>
  );
}

export default App;
