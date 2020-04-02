import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AsyncSelect from 'react-select';
import { toast } from 'react-toastify';
import { Container, Title, Topo } from './styles';
import history from '~/services/history';
import api from '~/services/api';

export default function RecipientEdit({ history: navigation }) {
  const { student } = navigation.location.state;
  const [recipient, setRecipient] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_Code] = useState('');

  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { page: pages, recipientName },
      });

      setRecipient(response.data);
    }
    loadRecipient();
  }, [pages, recipientName]);

  function handleBack() {
    history.push('/recipient/list');
  }

  async function handleSubmit({
    name,
    email,
    street,
    number,
    complement,
    state,
    city,
    zip_code,
  }) {
    // history.push('/delivery');
    // console.log(selectedRecipient, selectedDeliveryman, name);
    try {
      const response = await api.post('recipients', {
        name,
        email,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      });
      toast.success('Destinatário cadastrado com sucesso');
    } catch (err) {
      toast.error('Erro ao realizar o cadastro de destinatário');
    }
  }

  return (
    <Container>
      <Title>Edição de Destinatarios</Title>

      <Form onSubmit={handleSubmit}>
        <Topo>
          <button type="button" onClick={handleBack}>
            <MdChevronLeft size={18} color="#FFF" />
            Voltar
          </button>
          <button type="submit" onClick={handleSubmit}>
            <MdAdd size={18} color="#FFF" />
            Cadastrar
          </button>
        </Topo>

        <span>Nome </span>
        <Input name="name" placeholder="Nome do destinatário" />

        <span>E-mail</span>
        <Input name="email" placeholder="E-mail do destinatário" />

        <span>Rua </span>
        <Input name="street" placeholder="Nome da rua" />

        <span>Número</span>
        <Input name="number" placeholder="Número" />

        <span>Complemento</span>
        <Input name="complement" placeholder="Complemento" />

        <span>Cidade</span>
        <Input name="city" placeholder="Cidade" />

        <span>Estado</span>
        <Input name="state" placeholder="Estado" />

        <span>CEP</span>
        <Input name="zip_code" placeholder="Cep" />
      </Form>
    </Container>
  );
}
