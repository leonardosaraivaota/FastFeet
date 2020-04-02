import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  /*
  function handleSubmit(data) {
    // console.tron.log(data);
    dispatch(signInRequest(...data));
  }
  */
  function handleSubmit({ email, password }) {
    // console.tron.log(data);
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <small>SEU E-MAIL</small>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <small>SUA SENHA</small>
        <Input name="password" type="password" placeholder="********" />

        <button type="submit">
          {' '}
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
