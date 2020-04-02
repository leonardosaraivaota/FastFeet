import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, SubmitButton, SubmitText } from './styles';
import api from '~/services/api';

export default function DeliveryProblemNew({ navigation }) {
  const deliveryman_id = useSelector(state => state.auth.id);
  const delivery_id = navigation.getParam('id');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await api.post(`delivery/${deliveryman_id}/problems`, {
        delivery_id,
        description: problem.text,
      });
      Alert.alert('Problema na entrega gravado com sucesso!');
      setLoading(false);
    } catch (err) {
      Alert.alert('Erro ao gravar o problema na entrega!');
      setLoading(false);
      setProblem('');
    }
  }

  return (
    <Container>
      <Form>
        <TextInput
          name="problem"
          style={{ height: 140 }}
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          onChangeText={text => setProblem({ text })}
          value={problem}
        />
      </Form>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        <SubmitText>Enviar</SubmitText>
      </SubmitButton>
    </Container>
  );
}
DeliveryProblemNew.navigationOptions = ({ navigation }) => ({
  title: 'Novo problema',
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
