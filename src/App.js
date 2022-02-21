import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  /*eslint no-unused-vars: */
  const [_, setSetterTimeout] = useState();
  const [error, setError] = useState();

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
      <input className="input" placeholder="search user ..." onChange={onChangeHandler} />
      <div className='content'>
        {
          error ? <p>{error}</p> : (
            users && users.map((user) => (
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noreferrer"
                key={user.id}
                className="user-list-item"
              >
                <img width={50} src={user.avatar_url} alt={user.login} style={{ borderRadius: '100px' }} />
                <h3>{user.login}</h3>
              </a>
            ))
          )
        }
      </div>
    </div>
  );
}

export default App;
