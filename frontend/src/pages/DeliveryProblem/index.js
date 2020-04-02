import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import { Container, Title, Topo } from './styles';
import api from '~/services/api';

export default function DeliveryProblem() {
  const [deliveryProblem, setDeliveryProblem] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function loadDeliveryProblem() {
      const response = await api.get('delivery/problems', {
        params: { page: pages },
      });

      setDeliveryProblem(response.data);
    }
    loadDeliveryProblem();
  }, [pages]);

  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Gerenciando Problemas na Entrega</Title>
        <table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryProblem.map(deliveryProblems => (
              <tr key={deliveryProblems.id}>
                <td>#{deliveryProblems.id}</td>
                <td>{deliveryProblems.description}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </Container>
  );
}
