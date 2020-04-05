import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert, FlatList } from 'react-native';

// import Header from '~/components/Header';
import Background from '~/components/Background';
import DeliveryProblem from '~/components/DeliveryProblem';

import api from '~/services/api';
import { Container, Form, Title, SubmitButton, SubmitText } from './styles';

export default function DeliveryProblemList({ navigation }) {
  const deliveryman_id = useSelector(state => state.auth.id);
  const delivery_id = navigation.getParam('id');

  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliveryProblems() {
      // const response = await api.get(`/deliverymans/${id}/picks`);
      const response = await api.get(`delivery/${delivery_id}/problems`);
      // console.tron.log(response.data);
      setDeliveryProblems(response.data);
    }
    loadDeliveryProblems();
  }, [delivery_id]);

  async function handleSubmit() {
    navigation.navigate('Delivery', { deliveryProblems });
    /*
      try{
        const response = await api.post(`/students/${id}/checkins`);
      }
      catch(err) {

      }
    */
  }

  return (
    <Background>
      <Container>
        <Form>
          {/*
          <SubmitButton loading={loading} onPress={handleSubmit}>
            <SubmitText>Novo pedido de auxílio</SubmitText>
          </SubmitButton>
          */}
          <Title>Encomenda {delivery_id}</Title>
          <FlatList
            data={deliveryProblems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <DeliveryProblem data={item} />}
          />
        </Form>
      </Container>
    </Background>
  );
}

DeliveryProblemList.navigationOptions = {
  tabBarLabel: 'Visualizar Problemas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
