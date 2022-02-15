import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { AuthContext } from '.';
import './App.css';
import { withAuth } from './hoc/withAuth';
import { LoginForm } from './pages/Login';
import { ProfilePage } from './pages/Profile';

export const App: FC = observer(() => {
  const { store } = useContext(AuthContext);


  const AuthProfile = withAuth(ProfilePage);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <div className="App">
      {!store.isLoading && (
        <div>
          <h1>{store.isAuth ? 'Auth' : 'NOT auth'}</h1>
          <h2>{store.isAuth && `${store.user.email}`}</h2>

          {<LoginForm />}
          {<AuthProfile />}
        </div>
      )}
    </div>
  );
});
