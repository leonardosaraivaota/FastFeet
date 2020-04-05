import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import api from '~/services/api';
import {
  Container,
  Preview,
  ButtonContainer,
  Capture,
  ButtonText,
} from './styles';

export default function DeliveryConfirm({ navigation }) {
  const delivery = navigation.getParam('delivery');
  const deliveryId = navigation.getParam('id');
  const [camera, setCamera] = useState('');
  const [file, setFile] = useState('');

  async function createFormData() {
    const dataFile = new FormData();
    dataFile.append('file', {
      // data.append({
      uri: file.uri,
      name: `${deliveryId}.jpg`,
      type: 'image/jpeg',
    });
    return dataFile;
  }

  async function handleSubmit() {
    try {
      const bodyData = await createFormData();
      const response = await api.post('signatures', bodyData);
      console.tron.log(response);
      const flag = await api.put(`delivery-picker/${deliveryId}`, {
        delivery_id: delivery.id,
        recipient_id: delivery.recipient_id,
        deliveryman_id: delivery.deliveryman_id,
        signature_id: response.data.id,
        product: delivery.product,
        end_date: delivery.end_date,
      });
      console.tron.log(flag);
    } catch (err) {
      console.tron.log(err);
    }
  }

  const cam = useRef();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      // console.log(data.uri);
      // setPhoto(data.uri);
      setFile(data);
      const response = await handleSubmit();
      // console.log(response);
    }
  };

  return (
    <Container>
      <RNCamera
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        ref={ref => setCamera(ref)}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={takePicture}
          style={{
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}> ENVIAR </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

DeliveryConfirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar a entrega',
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
