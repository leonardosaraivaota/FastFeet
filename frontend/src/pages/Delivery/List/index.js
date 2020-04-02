/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdBrightness1,
  MdVisibility,
  MdModeEdit,
  MdDelete,
} from 'react-icons/md';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { Container, Title, Topo, Status, Text } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function DeliveryList() {
  const [delivery, setDelivery] = useState([]);
  const [deliveryProductName, setDeliveryProductName] = useState('');
  const [pages, setPages] = useState(1);
  const [input, setInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');
  // let subtitle;

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get('delivery', {
        params: { page: pages, deliveryProductName: input },
      });
      console.tron.log(response.data);
      // let startDate;
      // let endDate;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      /*
      const data = response.data.map(del => {
        if (del.start_date !== null) {
          const startDateTimezone = utcToZonedTime(del.start_date, timezone);

          setStartDate(
            format(startDateTimezone, 'dd/MM/yyyy', {
              locale: pt,
            })
          );
        }
        if (del.end_date !== null) {
          const endDateTimezone = utcToZonedTime(del.end_date, timezone);
          setEndDate(
            format(endDateTimezone, 'dd/MM/yyyy', {
              locale: pt,
            })
          );
        }
        return {
          ...del,
          start_date: startDate,
          end_date: endDate,
        };
        */
      setDelivery(response.data);
    }
    loadDelivery();
  }, [deliveryProductName, input, pages]);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    history.push('/delivery');
  }

  function handleView(id) {
    history.push(`/delivery/${id}`);
  }

  function handleEdit(id) {
    history.push(`/delivery/edit/${id}`);
  }

  async function handleDelete(id) {
    const confirmation = confirm('Deseja realmente excluir?');

    if (confirmation) {
      await api.delete(`/delivery/${id}`);
    }
  }

  return (
    <Container>
      <Title>Gerenciando Encomendas</Title>

      <Form>
        <Topo>
          <Input
            name="encomendas"
            type="text"
            value={input}
            placeholder="Buscar por encomendas"
            onChange={() => handleInput(event)}
          />
          <button type="button" onClick={handleSubmit}>
            <MdAdd size={18} color="#FFF" />
            Cadastrar
          </button>
        </Topo>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {delivery.map(deliveries => (
              <tr key={deliveries.id}>
                <td>#{deliveries.id}</td>
                <td>{deliveries.recipient.name}</td>
                <td>{deliveries.deliveryman.name}</td>
                <td>{deliveries.recipient.city}</td>
                <td>{deliveries.recipient.state}</td>
                <td>
                  <Status status={deliveries.status}>
                    <p>{deliveries.status}</p>
                  </Status>
                </td>
                <td>
                  <button type="button" onClick={openModal}>
                    <MdVisibility color="#7159c1" />
                    Visualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(deliveries.id)}
                  >
                    <MdModeEdit color="blue" />
                    Editar
                  </button>
                  <button type="button" onClick={handleDelete}>
                    <MdDelete color="red" />
                    Excluir
                  </button>
                </td>
                <td>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2>Informações da encomenda #{deliveries.id}</h2>
                    <button type="button" onClick={closeModal}>
                      Fechar
                    </button>
                    <div>
                      {deliveries.recipient.street},
                      {deliveries.recipient.number}
                      {deliveries.recipient.complement}
                      <br />
                      {deliveries.recipient.city}-{deliveries.recipient.state}
                      <br />
                      {deliveries.recipient.zip_code}
                    </div>

                    <hr />

                    <div>
                      <h2>DATAS</h2>
                      <p>
                        RETIRADA:
                        {deliveries.start_date ? deliveries.start_date : ''}
                      </p>
                      <p>
                        ENTREGA:{deliveries.end_date ? deliveries.end_date : ''}
                      </p>
                    </div>

                    <hr />

                    <div>
                      <h2>Assinatura do destinatário</h2>
                      <p>
                        <img src={deliveries.url} alt="Assinatura" />
                      </p>
                    </div>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </Container>
  );
}
