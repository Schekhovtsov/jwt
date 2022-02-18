import React, { FC, useContext, useEffect } from 'react';
import { AuthContext } from '..';
import { ProfilePage } from '../pages/Profile';

interface Props {
  title: string;
}

export const withAuth =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & any> =>
  (props: any) => {
    const { store } = useContext(AuthContext);

    if (store.isAuth) {
      return <Component {...(props as P)} />;
    } else {
      return <h1>You don't have access</h1>;
    }
  };
