import React, { useEffect, useState } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { getRepoName } from 'utils/requests';
import { useRecoilState } from 'recoil';
import { repoNameState } from 'atoms';

const URLRegExp = /^(https:\/\/github.com\/)[\w-]+\/[\w-]+(\/)*$/;

function InputBlock() {
  const [repoName, setRepoName] = useRecoilState(repoNameState);
  const [value, setValue] = useState(repoName);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const name = await getRepoName();
      setRepoName(name);
      setValue(name);
    })();
  }, [setRepoName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(false);
  };

  const handleSubmit = () => {
    if (!URLRegExp.test(value)) {
      setError(true);
    } else {
      setRepoName(value);
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
