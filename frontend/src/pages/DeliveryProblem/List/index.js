/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdVisibility, MdModeEdit, MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
import { Container, Title, Topo } from './styles';
import api from '~/services/api';

export default function DeliveryProblemList() {
  const [deliveryProblem, setDeliveryProblem] = useState([]);
  const [pages, setPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let subtitle;
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

  function handleView(id) {
    history.push(`/delivery/${id}`);
  }

  function handleEdit(id) {
    history.push(`/delivery/edit/${id}`);
  }

  async function handleDelete(id) {
    const confirmation = confirm('Deseja realmente excluir?');

    if (confirmation) {
      await api.delete(`/deliveryproblem/${id}`);
    }
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
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {deliveryProblem.map(deliveryProblems => (
              <tr key={deliveryProblems.id}>
                <td>#{deliveryProblems.id}</td>
                <td>
                  <p onClick={openModal}>{deliveryProblems.description}</p>
                </td>
                <td>
                  <button type="button" onClick={openModal}>
                    <MdModeEdit color="blue" />
                    Visualizar
                  </button>
                  <button type="button" onClick={handleDelete}>
                    <MdDelete color="red" />
                    Cancelar Encomenda
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
                    <h2>Descrição do problema</h2>
                    <button onClick={closeModal}>Fechar</button>
                    <div>{deliveryProblems.description}</div>
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
