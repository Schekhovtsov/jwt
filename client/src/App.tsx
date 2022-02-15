import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { AuthContext } from '.';
import './App.css';
import { withAuth } from './hoc/withAuth';
import { LoginForm } from './pages/Login';
import { ProfilePage } from './pages/Profile';

interface Props {
  title: string;
}
const withHeader = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & Props> => (props: Props) => (
  <>
    <h1>ХОК</h1>
    <Component {...(props as P)} />
  </>
);


export const App: FC = observer(() => {
  const { store } = useContext(AuthContext);

  const NewComponentLogin = withHeader(LoginForm);
  const NewComponentProfile = withHeader(ProfilePage);

  return (
    <div className="App">
      {!store.isLoading && (
        <div>
          <h1>{store.isAuth ? 'Auth' : 'NOT auth'}</h1>
          <h2>{store.isAuth && `${store.user.email}`}</h2>

          {NewComponentLogin}
        </div>
      )}
    </div>
  );
});
