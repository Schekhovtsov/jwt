import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '..';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';

/* interface IFormInput {
  email: String;
  password: String;
} */

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(AuthContext);

  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    store.login(email, password);
  };

  const handleRegister = () => {
    store.registration(email, password);
  };

  const handleLogout = () => {
    store.logout();
  };

  return (
    <div>
      {!store.isAuth ? (
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
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

  /*   const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.password = '1488';
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>E-mail</label>
      <input {...(register('email'), { required: true })} />
      <label>Password</label>
      <input {...register('password')} />
      <input type="submit" />
    </form>
  ); */
});
