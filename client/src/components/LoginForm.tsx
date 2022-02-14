import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '..';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm: FC = observer(() => {
;
  const { store } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<IFormInput>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLogin: SubmitHandler<IFormInput> = () => { 
    store.login(email, password);
  };

  const handleRegister = () => {
    store.registration(email, password);
  };

  const handleLogout = () => {
    store.logout();
  };

  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {!store.isAuth ? (
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label>E-mail</label>
            <input {...(register('email'))} onChange={(e) => handleEmailOnChange(e)}/>
            <label>Password</label>
            <input {...register('password')} onChange={(e) => handlePasswordOnChange(e) } />
            <input type="submit" />
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleGetUsers}>Get users</button>
          {users && users.map((user) => <div key={user.id}>{user.email}</div>)}
        </div>
      )}
    </div>
  );
});
