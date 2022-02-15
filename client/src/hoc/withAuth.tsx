import React, { FC, useContext, useEffect } from 'react';
import { AuthContext } from '..';
import { ProfilePage } from '../pages/Profile';

interface Props {
    title: string;
  }

  export const withAuth = <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & any> => (props: any) => {

/*     const { store } = useContext(AuthContext);
    useEffect(() => {
        if (localStorage.getItem('token')) {
          console.log('app have token', localStorage.getItem('token'));
          store.checkAuth();
        }
      }, []); */

      alert('hoc');


      
    
    return (<ProfilePage {...(props as P)} />);
  };