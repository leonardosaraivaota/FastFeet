import { Platform } from 'react-native';
import styled from 'styled-components';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;

  max-width: 100%;
`;

export const Name = styled.Text`
  font-style: normal;
  color: #000;
  font-weight: bold;
  font-size: 16px;
`;

export const Info = styled.View`
  max-width: 100%;
  height: 40px;
  justify-content: space-between;
  color: #fff;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  flex-flow: row;
  margin-bottom: 10px;
  align-self: stretch;
  border-radius: 10px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #000;
  align-self: center;
  display: inline-block;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #000;
`;
