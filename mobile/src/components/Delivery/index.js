import React, { useState, useMemo, useEffect } from 'react';
import { parseISO, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, FlatList, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import {
  Container,
  Top,
  Title,
  Middle,
  Bottom,
  DeliveryName,
  DeliveryDate,
  City,
  DetailLink,
  DetailLinkText,
} from './styles';

export default function Delivery({ data, onPress }) {
  const [currentPosition, setCurrentPosition] = useState(0);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  const labels = [
    'Aguardando Retirada',
    'Pendente',
    'Retirada',
    'Cancelada',
    'Entregue',
  ];
  const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 10,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: '#7159C1',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#7159C1',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#7159C1',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#7159C1',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#7159c1',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#7159C1',
    stepIndicatorLabelFinishedColor: '#7159c1',
    stepIndicatorLabelUnFinishedColor: '#ffffff',
    labelColor: '#7159c1',
    labelSize: 9,
    currentStepLabelColor: '#7159C1',
  };

  return (
    <Container>
      <Top>
        <Title>
          <Icon name="local-shipping" size={20} color="#7159c1" />
          <DeliveryName> Encomenda {data.id}</DeliveryName>
        </Title>
      </Top>
      <Middle>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
        />
      </Middle>
      <Bottom>
        <DeliveryDate>Data: {dateParsed}</DeliveryDate>
        <City>Cidade: {data.recipient.city}</City>
        <DetailLink onPress={onPress}>
          <DetailLinkText>Ver detalhes</DetailLinkText>
        </DetailLink>
      </Bottom>
    </Container>
  );
}
