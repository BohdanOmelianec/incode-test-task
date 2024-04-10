import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons';

const URLRegExp = /^(https:\/\/github.com\/)[\w-]+\/[\w-]+(\/)*$/;

interface Props {
  repoName?: string;
  getNewItems: (value: string) => Promise<void>;
}
function InputBlock({ repoName, getNewItems }: Props) {
  const [value, setValue] = useState(repoName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(false);
  };

  const handleSubmit = async () => {
    if (!URLRegExp.test(value)) {
      setError(true);
    } else {
      setTimeout(() => setLoading(true), 200);
      await getNewItems(value);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <Space.Compact style={{ position: 'relative', marginBottom: '8px' }}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Enter repo URL"
        status={error ? 'error' : ''}
        size="large"
        value={value}
        onChange={handleChange}
        onPressEnter={handleSubmit}
      />
      {error && (
        <span style={{ position: 'absolute', top: '100%', left: '16px', color: 'red' }}>
          URL must be as <code>{`https://github.com/{userName}/{repoName}`}</code>
        </span>
      )}
      <Button
        loading={loading}
        icon={<CloudDownloadOutlined />}
        disabled={!value}
        type="primary"
        onClick={handleSubmit}
        size="large"
        style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '.1rem' }}
      >
        LOAD ISSUES
      </Button>
    </Space.Compact>
  );
}

export default InputBlock;
