import React, { useMemo } from 'react';
import { parseISO, format, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Name, Info, Description, Time } from './styles';

export default function DeliveryProblem({ data }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.created_at), 'dd/MM/yyyy');
    /*
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
    */
  }, [data.created_at]);

  return (
    <Container>
      {/* <Name>Encomenda {data.id}</Name> */}
      <Info>
        <Description>
          {data.description} {dateParsed}
        </Description>
        <Time />
      </Info>
    </Container>
  );
}
