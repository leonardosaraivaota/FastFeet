import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Title, Topo } from './styles';
// import AvatarInput from '../Profile/AvatarInput';
import AvatarInput from '~/components/Avatar';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  nome: Yup.string().required('O Nome é obrigatória'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function DeliverymanEdit() {
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

  async function handleSubmit({ name, email, avatar_id }) {
    try {
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

  return (
    <Container>
      <Title>Edição de Entregadores</Title>

      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Topo>
          <button type="button" onClick={handleBack}>
            <MdChevronLeft size={18} color="#FFF" />
            Voltar
          </button>
          <button type="submit">
            <MdCheck size={18} color="#FFF" />
            Salvar
          </button>
        </Topo>
        <AvatarInput name="avatar_id" />

        <small>Nome</small>
        <Input name="name" placeholder="Nome do entregador" />

        <small>E-mail</small>
        <Input name="email" type="email" placeholder="E-mail do entregador" />
      </Form>
    </Container>
  );
}
