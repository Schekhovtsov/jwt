import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { AuthContext } from '.';
import './App.css';
import { withAuth } from './hoc/withAuth';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';

export const App: FC = observer(() => {
  const { store } = useContext(AuthContext);

  const AuthProfile = withAuth(ProfilePage);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.refreshAuth();
    }
  }, []);

  return (
    <div className="App">
      <h3>
        <NavLink to="/">Главная</NavLink> &nbsp; | &nbsp;
        <NavLink to="/login">Вход</NavLink> &nbsp; | &nbsp;
        <NavLink to="/profile">Профиль</NavLink>
      </h3>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>

      <div style={{margin: '20px'}}>
        {localStorage.getItem('token') ? 'Token: YES' : 'Token: NO'} <br />
        { store.isAuth ? 'Status: Auth' : 'Status: NOT auth' }
      </div>

      {/*       {!store.isLoading && (
        <div>
          <h1>{store.isAuth ? 'Auth' : 'NOT auth'}</h1>
          <h2>{store.isAuth && `${store.user.email}`}</h2>

          {<LoginForm />}
          {<AuthProfile />}
        </div>
      )} */}
    </div>
  );
});
