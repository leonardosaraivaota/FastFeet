/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdVisibility, MdModeEdit, MdDelete } from 'react-icons/md';
import { Container, Title, Topo } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function DeliverymanList() {
  const [deliveryman, setDeliveryman] = useState([]);
  const [deliverymanName, setDeliverymanName] = useState('');
  const [pages, setPages] = useState(1);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get('deliverymans', {
        params: { page: pages, deliverymanName: input },
      });

      setDeliveryman(response.data);
    }
    loadDelivery();
  }, [deliverymanName, input, pages]);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(data) {
    history.push('/deliveryman');
  }

  function handleView(id) {
    history.push(`/delivery/${id}`);
  }

  function handleEdit(id) {
    history.push(`/deliveryman/edit/${id}`);
  }

  async function handleDelete(id) {
    const confirmation = confirm('Deseja realmente excluir?');

    if (confirmation) {
      await api.delete(`/deliveryman/${id}`);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Gerenciando Entregadores</Title>
        <Topo>
          <Input
            name="entregadores"
            type="text"
            value={input}
            placeholder="Buscar por entregadores"
            onChange={() => handleInput(event)}
          />
          <button type="submit">
            <MdAdd size={18} color="#FFF" />
            Cadastrar
          </button>
        </Topo>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryman.map(deliverymans => (
              <tr key={deliverymans.id}>
                <td>#{deliverymans.id}</td>
                <td>
                  <img src={deliverymans.avatar.url} alt={deliverymans.name} />
                </td>
                <td>{deliverymans.name}</td>
                <td>{deliverymans.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(deliverymans.id)}
                  >
                    <MdModeEdit color="blue" />
                    Editar
                  </button>
                  <button type="button" onClick={handleDelete}>
                    <MdDelete color="red" />
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </Container>
  );
}
