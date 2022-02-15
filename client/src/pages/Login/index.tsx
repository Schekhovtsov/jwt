import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../..';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';

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



  return (
    <div>
      {!store.isAuth && 
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
      }
    </div>
  );
});
