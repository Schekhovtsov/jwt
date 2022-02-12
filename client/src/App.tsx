import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { AuthContext } from '.';
import './App.css';
import { LoginForm } from './components/LoginForm';

export const App: FC = observer(() => {
  const { store } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('app have token', localStorage.getItem('token'));
      store.checkAuth();
    }
  }, []);

  return (
    <div className="App">
      {!store.isLoading && (
        <div>
          <h1>{store.isAuth ? 'Auth' : 'NOT auth'}</h1>
          <h2>{store.isAuth && `${store.user.email}`}</h2>
          <LoginForm />
        </div>
      )}
    </div>
  );
});
