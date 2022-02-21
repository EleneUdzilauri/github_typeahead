import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Input, Table, Button, Tooltip } from 'antd';
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';

function App() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  /*eslint no-unused-vars: */
  const [_, setSetterTimeout] = useState();
  const [error, setError] = useState();
  const columns = useMemo(() => [
    {
      title: '',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (src, suggestion) => <img width={50} src={src} alt={suggestion.login} style={{ borderRadius: '100px' }} />
    },
    {
      title: 'Username',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Open Profile',
      dataIndex: 'login',
      key: 'login',
      render: (login, suggestion) => (
        <Tooltip title="Open Profile">
          <a
            href={`https://github.com/${login}`}
            target="_blank"
            rel="noreferrer"
            key={suggestion.id}
          >
            <Button type="primary" shape="circle" icon={<ArrowRightOutlined />} />
          </a>
        </Tooltip>
      )
    }
  ], []);

  const onChangeHandler = useCallback((e) => {
    setSetterTimeout(st => {
      clearTimeout(st)

      return setTimeout(() => {
        setInput(e.target.value);
      }, 500)
    })
  }, [])

  const getUsers = useCallback(async () => {
    try {
      const res = await fetch(`https://api.github.com${input ? '/search' : ''}/users?q=${input}`);
      const data = await res.json();

      setUsers(input ? data.items : data);
      setError(null)
    } catch (e) {
      setUsers(null)
      setError('Oops, something went wrong')
    }
  }, [input])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div className='container' style={{ minHeight: '100vh' }}>
      <div className='input'>
        <Input prefix={<UserOutlined />} placeholder="search user ..." onChange={onChangeHandler} size='large' />
      </div>
      {
        error ? <p>{error}</p> : (
          <Table
            dataSource={users}
            columns={columns}
            pagination={false}
            rowKey="login"
          />
        )
      }
    </div>
  );
}

export default App;
