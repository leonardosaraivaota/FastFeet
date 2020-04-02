import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AsyncSelect from 'react-select';
import { Container, Title, Topo } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function DeliveryEdit() {
  const [delivery, setDelivery] = useState([]);
  const [deliveryman, setDeliveryman] = useState('');
  const [recipient, setRecipient] = useState('');
  const [deliveryProductName, setDeliveryProductName] = useState('');
  const [pages, setPages] = useState(1);
  const [selectedRecipient, setSelectRecipient] = useState('');
  const [selectedDeliveryman, setSelectedDeliveryman] = useState('');

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get('delivery', {
        params: { page: pages, deliveryProductName },
      });

      setDelivery(response.data);
    }
    loadDelivery();
  }, [deliveryProductName, pages]);

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliverymans', {
        params: { deliverymanName: '' },
      });

      const deliverymans = response.data.map(del => {
        return {
          value: del.id,
          label: del.name,
        };
      });

      setDeliveryman(deliverymans);
    }

    loadDeliveryman();
  }, []);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { recipientName: '' },
      });

      const recipients = response.data.map(rec => {
        return {
          value: rec.id,
          label: rec.name,
        };
      });

      /*
      const recipients = response.data.map(rec => ({
        value: rec.id,
        label: rec.name,
      }));
      */
      setRecipient(recipients);
    }

    loadRecipient();
  }, []);

  function handleBack() {
    history.push('/delivery/list');
  }

  async function handleSubmit({ name }) {
    // history.push('/delivery');
    // console.log(selectedRecipient, selectedDeliveryman, name);
    const response = await api.post('delivery', {
      recipient_id: selectedRecipient,
      deliveryman_id: selectedDeliveryman,
      product: name,
    });

    console.log(response);
  }

  /*
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  function handleInputChangeRecipient(string) {
    const inputValue = string.replace(/\W/g, '');
    setRecipient({ inputValue });
    return inputValue;
  }
  */
  return (
    <Container>
      <Title>Edição de Encomendas</Title>

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

        <span>Destinatário</span>
        <AsyncSelect
          name="recipient"
          cacheOptions
          options={recipient}
          /* onChange={opt => console.log(opt.label, opt.value)} */
          onChange={e => setSelectRecipient(e.value)}

          /*
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          */
        />

        <span>Entregadores</span>
        <AsyncSelect
          name="deliveryman"
          cacheOptions
          options={deliveryman}
          onChange={e => setSelectedDeliveryman(e.value)}
        />

        <span>Nome do Produto</span>
        <Input name="name" placeholder="Nome do produto" />
      </Form>
    </Container>
  );
}
