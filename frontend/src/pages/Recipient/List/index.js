/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdVisibility, MdModeEdit, MdDelete } from 'react-icons/md';
import { Container, Title, Topo } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function RecipientList() {
  const [recipient, setRecipient] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [pages, setPages] = useState(1);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { page: pages, recipientName: input },
      });

      setRecipient(response.data);
    }
    loadRecipient();
  }, [input, pages, recipientName]);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    history.push('/recipient');
  }

  function handleView(id) {
    history.push(`/recipient/${id}`);
  }

  function handleEdit(id) {
    history.push(`/recipient/edit/${id}`, { recipient });
  }

  async function handleDelete(id) {
    const confirmation = confirm('Deseja realmente excluir?');

    if (confirmation) {
      await api.delete(`/recipient/${id}`);
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Gerenciando Destinatários</Title>
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
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipient.map(recipients => (
              <tr key={recipients.id}>
                <td>#{recipients.id}</td>
                <td>{recipients.name}</td>
                <td>
                  {recipients.street},{recipients.number},
                  {recipients.complement},{recipients.zip_code},
                  {recipients.city}-{recipients.state}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(recipients.id)}
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
