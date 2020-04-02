import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  signUpSuccess,
  signFailure,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'deliverymans', profile);

    toast.success('Perfil do entregador atualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil do entregador, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, avatar_id } = payload;
    console.tron.log(name, email, avatar_id);
    yield call(api.post, 'deliverymans', {
      name,
      email,
      avatar_id,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}
export default all([
  takeLatest('@deliveryman/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@deliveryman/SIGN_UP_REQUEST', signUp),
]);
