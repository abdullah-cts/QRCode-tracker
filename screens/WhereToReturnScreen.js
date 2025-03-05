import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const Wheretoreturnscreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [productQR, setProductQR] = useState(null);
  const navigation = useNavigation();
  const [location, setLocation] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (data.length > 0) {
      setProductQR(data);
      setLocation(data);
      setScanning(false);
    } else {
      navigation.navigate('Error');
      console.log('No barcodes detected.');
    }
  };

  const startScanning = () => {
    setScanning(true);
    setLocation('');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        style={styles.camera}
        onBarcodeScanned={scanning ? handleBarCodeScanned : undefined}
      />
      {location !== '' && (
        <View style={styles.locationDisplay}>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            productQR ? styles.disabledButton : styles.enabledButton,
          ]}
          onPress={startScanning}
          disabled={!!productQR}
        >
          <Text style={styles.buttonText}>Where to Return</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[
              styles.button,
              !productQR ? styles.disabledButton : styles.enabledButton,
            ]}
            onPress={handleGoHome}
          >
            <Text style={styles.buttonText}>Go Back to Home Page</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  enabledButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  permissionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  locationDisplay: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#c8cdd2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  locationText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Wheretoreturnscreen;