import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  // const passwordRef = useRef();

  const [id, setId] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    // dispatch(signInRequest(email, password));
    dispatch(signInRequest(id));
  }

  return (
    <Background>
      {/*
      <Text>SignIn</Text>
      <Input
        style={{ marginTop: 30 }}
        icon="call"
        placeholder="Digite seu nome"
      />
      <Button>Entrar</Button>
      */}

      <Container>
        <Image source={logo} alt="FASTFEET" />

        <Form>
          <FormInput
            icon="perm-identity"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          {/*
          <FormInput
            icon="lock-outline"
            securyTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          */}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuíta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
