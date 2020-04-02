import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { Image, FlatList, TouchableOpacity } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
// import Appointment from '~/components/Appointment';
import DeliveryList from '~/components/Delivery';

import { Container, Top, Title, Avatar, Name, Option } from './styles';

function Dashboard({ isFocused, navigation }) {
  const id = useSelector(state => state.auth.id);
  // console.tron.log(id);

  const [deliverymans, setDeliverymans] = useState([]);
  const [deliverys, setDeliverys] = useState([]);
  const [deliveryProductName, setDeliveryProductName] = useState('');

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get(`deliverymans/${id}`);
      setDeliverymans(response.data);
    }
    loadDeliverymans();
  }, [id]);

  useEffect(() => {
    async function loadDeliverys() {
      const response = await api.get('delivery', {
        params: {
          deliveryProductName,
        },
      });
      setDeliverys(response.data);
    }
    loadDeliverys();
  }, [deliveryProductName]);

  /*
  useEffect(() => {
    loadAppointments();
  }, []);
  */
  /*
  useEffect(() => {
    if (isFocused) {
      loadDeliverys();
    }
  }, [isFocused]);
  */
  /*
  async function handleCancel(id) {
    const response = await api.delete(`delivery/${id}`);

    setDeliverys(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }
  */

  function handleProfile() {
    navigation.navigate('Profile');
  }
  /*
  const handleDetail = item => {
    // console.log(item);
    navigation.navigate('DeliveryDetail', { item });
  };
  */
  function handleDetail(item) {
    // console.log(item);
    navigation.navigate('DeliveryDetail', { item });
  }

  return (
    <Background>
      <Container>
        <FlatList
          data={deliverys}
          keyExtrator={item => String(item.id)}
          renderItem={({ item }) => (
            <DeliveryList data={item} onPress={() => handleDetail(item)} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
