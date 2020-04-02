import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
// import Header from '~/components/Header';
import Background from '~/components/Background';

import api from '~/services/api';
import { Container, Form, SubmitButton, SubmitText, List } from './styles';

import DeliveryList from '~/components/Delivery';

function Delivery({ navigation }) {
  const id = useSelector(state => state.auth.id);

  const [deliverys, setDeliverys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliverys() {
      // const response = await api.get(`/deliverymans/${id}/picks`);
      const response = await api.get(`/deliverymans/${id}/picks`);
      setDeliverys(response.data);
    }
    loadDeliverys();
  }, [id]);

  async function handleSubmit() {
    navigation.navigate('Delivery', { deliverys });
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
      {/* <Header /> */}
      <Container>
        <Form>
          <SubmitButton loading={loading} onPress={handleSubmit}>
            <SubmitText>Novo pedido de auxílio</SubmitText>
          </SubmitButton>

          <FlatList
            data={deliverys}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <DeliveryList data={item} />}
          />
        </Form>
      </Container>
    </Background>
  );
}

Delivery.navigationOptions = {
  tabBarLabel: 'Encomendas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Delivery);
