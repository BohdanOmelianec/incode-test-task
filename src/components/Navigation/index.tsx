import React from 'react';
import { Breadcrumb,  } from 'antd';
import { useRecoilValue } from 'recoil';
import { breadcrumbLinks } from 'atoms';

function Navigation() {
  const breadcrumbs = useRecoilValue(breadcrumbLinks);
  return (
    <Breadcrumb items={breadcrumbs} />
  )
}

export default Navigation;
