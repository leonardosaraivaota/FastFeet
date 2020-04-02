import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #ddd;
  border-width: 3px;
  border-style: dashed;
  border-color: black;
  margin: 10px 10px;

  span {
    flex: 1;
    flex-direction: row;
  }
`;

export const Top = styled.View`
  margin: 10px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-left: 30px;
  justify-content: space-between;
`;

export const DeliveryName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7159c1;
`;

export const Middle = styled.View``;

export const Bottom = styled.View`
  margin: 10px;
  justify-content: space-between;

  span {
    font-weight: bold;
  }
`;

export const DeliveryDate = styled.Text``;

export const City = styled.Text``;

export const DetailLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const DetailLinkText = styled.Text`
  color: #7159c1;
`;
