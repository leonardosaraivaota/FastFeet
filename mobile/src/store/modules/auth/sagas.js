import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';
// import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    /*
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    */

    const { id } = payload;

    const response = yield call(api.post, 'appsessions', { id });

    const { token, user } = response.data;

    /*
    if (user.provider) {
      //console.tron.error('Usuário não é prestador');
      //toast.error('Usuário não é prestador');
        Alert.alert('Erro no login','O usuário não pode ser prestador de serviços');
      return;
    }
    */

    api.defaults.headers.Authorization = `Bearer ${token}`;

    /* yield delay(3000); */

    yield put(signInSuccess(id, token, user));

    // history.push('/dashboard');
  } catch (err) {
    // toast.error('Falha na autenticação, verifique seus dados');
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      // provider: true,
    });

    // history.push('/');
  } catch (err) {
    // toast.error('Falha no cadastro, verifique seus dados!');
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
