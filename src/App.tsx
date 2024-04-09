import React from 'react';
import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import Content from './components/Content';
import AppBar from 'components/AppBar';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <RecoilRoot>
        <Layout style={{ height: '100%' }}>
          <AppBar />
          <Content />
        </Layout>
      </RecoilRoot>
    </SnackbarProvider>
  );
}

export default App;
