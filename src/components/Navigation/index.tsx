import React from 'react';
import { Breadcrumb } from 'antd';
import { Links } from 'appTypes/index';

function Navigation({ items }: { items: Links }) {
  return <Breadcrumb items={items} />;
}

export default Navigation;
