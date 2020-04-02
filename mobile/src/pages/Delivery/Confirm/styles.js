import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #000;
`;

export const Preview = styled.View`
  flex: 1;
  justify-content: 'flex-end';
  align-items: 'center';
`;

export const Capture = styled(Button)`
  flex: 0;
  background-color: '#fff';
  border-radius: 5;
  padding: 15;
  /*paddinghorizontal: 20;*/
  align-self: 'center';
  margin: 20;
`;

export const ButtonContainer = styled(Button)``;

export const ButtonText = styled.Text``;
