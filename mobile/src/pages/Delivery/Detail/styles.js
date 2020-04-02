import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DeliveryInformation = styled.View`
  background-color: #fff;
  border-width: 1px;
  height: 200px;
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
`;

export const DeliveryName = styled.Text`
  color: #7159c1;
  margin-top: -20px;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const DeliveryStatus = styled.View`
  background-color: #fff;
  border-width: 1px;
  height: 200px;
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: 5px;
`;

export const DeliveryOptions = styled.View`
  max-height: 100px;
  width: 95px;
  border-width: 1px;
  align-self: stretch;

  img {
    align-self: center;
  }
`;

export const Footer = styled.View`
  align-self: center;
  background-color: #fff;
  flex-direction: row;
  margin-top: 10px;
`;

export const Name = styled.Text``;
export const Address = styled.Text``;
export const Product = styled.Text``;
export const Status = styled.Text``;
export const StartDate = styled.Text``;
export const EndDate = styled.Text``;

export const OptionBlock = styled(Button)`
  width: 100px;
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
`;
export const Option = styled.Text`
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
