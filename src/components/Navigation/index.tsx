import React from 'react';
import { Breadcrumb } from 'antd';
import { useRecoilValue } from 'recoil';
import { breadcrumbLinksState } from 'atoms';

function Navigation() {
  const breadcrumbs = useRecoilValue(breadcrumbLinksState);

  return <Breadcrumb items={breadcrumbs} />;
}

export default Navigation;
