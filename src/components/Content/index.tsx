import React from 'react';
import { Layout, Spin } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import localforage from 'localforage';
import Columns from 'components/Columns';
import InputBlock from 'components/InputBlock';
import Navigation from 'components/Navigation';
import { breadcrumbLinksState, columnListState, repoNameState } from 'atoms';
import { getAllIssues } from 'utils/requests';

function Content() {
  const [repoName, setRepoName] = useRecoilState(repoNameState);
  const setColumnList = useSetRecoilState(columnListState);
  const breadcrumbs = useRecoilValue(breadcrumbLinksState);

  const getNewItems = async (value: string) => {
    const newList = await getAllIssues(value);
    if (newList) {
      setRepoName(value);
      setColumnList(newList);

      await localforage.setItem('repoName', value);
    }
  };

  return (
    <Layout.Content className="content">
      <InputBlock repoName={repoName} getNewItems={getNewItems} />
      <Navigation items={breadcrumbs} />
      <React.Suspense
        fallback={<Spin fullscreen tip="Loading..." size="large" delay={700} />}
      >
        <Columns />
      </React.Suspense>
    </Layout.Content>
  );
}

export default Content;
