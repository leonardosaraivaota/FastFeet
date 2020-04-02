import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signUpRequest } from '~/store/modules/deliveryman/actions';

// import AvatarInput from '../Profile/AvatarInput';
import AvatarInput from '~/components/Avatar';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Title } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function Deliveryman() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [deliveryman, setDeliveryman] = useState([]);
  const [deliverymanName, setDeliverymanName] = useState('');
  const [pages, setPages] = useState(1);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliverymans', {
        params: { page: pages, deliverymanName },
      });
      setDeliveryman(response.data);
    }
    loadDeliveryman();
  }, [deliverymanName, pages]);

  function handleBack() {
    history.push('/deliveryman/list');
  }

  // function handleInput(e) {
  //  setPrice(e.target.value);
  // }
  /*
  async function handleSubmit({ name, email, avatar_id }) {
    try {
      console.tron.log(name, email, avatar_id);
      await api.post('deliverymans', {
        name,
        email,
        avatar_id,
      });

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliveryman/list');
    } catch (err) {
      toast.error('Erro ao cadastrar o entregador!');
    }
  }
 */
  function handleSubmit(data) {
    dispatch(signUpRequest(data));
  }

  return (
    <Container>
      <Title>Cadastro de Entregador</Title>

      <Form schema={schema} id="deliveryman" onSubmit={handleSubmit}>
        <button type="button" onClick={handleBack}>
          <MdChevronLeft size={18} color="#FFF" />
          Voltar
        </button>
        <button type="submit">
          <MdCheck size={18} color="#FFF" />
          Salvar
        </button>

        <AvatarInput name="avatar_id" />

        <small>Nome</small>
        <Input name="name" placeholder="Nome do entregador" />

        <small>E-mail</small>
        <Input name="email" type="email" placeholder="E-mail do entregador" />
      </Form>
    </Container>
  );
}
