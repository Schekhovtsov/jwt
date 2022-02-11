import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthContext } from '..';

/* interface IFormInput {
  email: String;
  password: String;
} */

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(AuthContext)

  const handleLogin = () => {
    store.login(email, password)
  }

  const handleRegister = () => {
    store.registration(email, password)
  }

  return(
    <div>
      <input type='text'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder='E-mail'
      />
            <input type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder='Password'
      />
     <button onClick={handleLogin}>Login</button>
     <button onClick={handleRegister}>Register</button>
    </div>
  )

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
