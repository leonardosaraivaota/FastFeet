import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo.png';
// import { Container } from './styles';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  // function handleSubmit(data) {
  function handleSubmit({ name, email, password }) {
    // console.tron.log(data);
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <small>NOME COMPLETO</small>
        <Input name="name" placeholder="Fulano de Silva" />
        <small>SEU E-MAIL</small>
        <Input name="email" type="email" placeholder="email@exemplo.com" />
        <small>SUA SENHA SECRETA</small>
        <Input name="password" type="password" placeholder="******" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
