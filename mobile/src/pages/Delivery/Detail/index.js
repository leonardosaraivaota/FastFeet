import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { parseISO, format, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DeliveryInformation,
  DeliveryName,
  DeliveryStatus,
  Footer,
  DeliveryOptions,
  Name,
  Address,
  Product,
  Status,
  StartDate,
  EndDate,
  Option,
} from './styles';

export default function DeliveryDetail({ navigation }) {
  const delivery = navigation.getParam('item');
  // console.log(delivery);
  /*
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(delivery.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [delivery.created_at]);
*/
  const start_date = delivery.start_date ? parseISO(delivery.start_date) : null;
  const pickUpDate = useMemo(() =>
    start_date ? format(start_date, 'dd/MM/yyy') : '--/--/--'
  );
  const end_date = delivery.end_date ? parseISO(delivery.end_date) : null;
  const deliveryDate = useMemo(() =>
    end_date ? format(end_date, 'dd/MM/yyy') : '--/--/--'
  );

  /*
  const start_date = delivery.start_date ? parseISO(delivery.start_date) : null;
  const pickUpDate = useMemo(() =>
    start_date ? format(start_date, 'dd/MM/yyy') : '--/--/--'
  );

  const end_date = delivery.end_date ? parseISO(delivery.end_date) : null;
  const deliveryDate = useMemo(() =>
    end_date ? format(end_date, 'dd/MM/yyy') : '--/--/--'
  );
  */
  function handleNewProblem(id) {
    // console.log(id);
    navigation.navigate('DeliveryProblemNew', { id });
  }

  function handleListProblem(id) {
    // console.log(id);
    navigation.navigate('DeliveryProblemList', { id });
  }

  function handleConfirmDelivery(id) {
    // console.log(id);
    navigation.navigate('DeliveryConfirm', { id });
  }

  return (
    <Container>
      <DeliveryInformation>
        <Icon name="local-shipping" size={20} color="#7159c1" />
        <DeliveryName>Informações da Entrega</DeliveryName>

        <Name>DESTINATÁRIO: {delivery.recipient.name}</Name>
        <Address>
          ENDEREÇO: {delivery.recipient.street},{delivery.recipient.number}
          {delivery.recipient.complement}
          {delivery.recipient.city}/{delivery.recipient.state}-
          {delivery.recipient.zip_code}
        </Address>
        <Product>PRODUTO: {delivery.product}</Product>
      </DeliveryInformation>

      <DeliveryStatus>
        <Icon name="event" size={20} color="#7159c1" />
        <DeliveryName>Situação da Entrega</DeliveryName>

        <Status>STATUS: {delivery.status}</Status>
        <StartDate>DATA DA RETIRADA: {pickUpDate}</StartDate>
        <EndDate>DATA DA ENTREGA: {deliveryDate}</EndDate>
      </DeliveryStatus>

      <Footer>
        <DeliveryOptions>
          <TouchableOpacity onPress={() => handleNewProblem(delivery.id)}>
            <Icon
              name="highlight-off"
              size={20}
              color="red"
              style={{ alignSelf: 'center' }}
            />
            <Option>Informar Problema</Option>
          </TouchableOpacity>
        </DeliveryOptions>

        <DeliveryOptions>
          <TouchableOpacity onPress={() => handleListProblem(delivery.id)}>
            <Icon
              name="info"
              size={20}
              color="yellow"
              style={{ alignSelf: 'center' }}
            />
            <Option>Visualizar Problemas</Option>
          </TouchableOpacity>
        </DeliveryOptions>

        <DeliveryOptions>
          <TouchableOpacity onPress={() => handleConfirmDelivery(delivery.id)}>
            <Icon
              name="check-circle"
              size={20}
              color="#7159c1"
              style={{ alignSelf: 'center' }}
            />
            <Option>Confirmar Entrega</Option>
          </TouchableOpacity>
        </DeliveryOptions>
      </Footer>
    </Container>
  );
}

DeliveryDetail.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da entrega',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
