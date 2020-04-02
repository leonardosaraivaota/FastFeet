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
  padding: 0 30px;
`;

export const Form = styled.View`
  margin-top: 10px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #7159c1;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
  color: #7159c1;
`;

export const SubmitText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
