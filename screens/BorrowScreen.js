import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

const BorrowScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(null);
  const [studentQR, setStudentQR] = useState(null);
  const [productQR, setProductQR] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useNavigation();
  const [displayData, setDisplayData] = useState('');

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
      setDisplayData(data);
      if (scanning === 'student') {
        setStudentQR(data);
        setScanning(null);
        console.log('Student QR:', data);
      } else if (scanning === 'product') {
        setProductQR(data);
        setScanning(null);
        console.log('Product QR:', data);
      }
    } else {
      navigation.navigate('Error');
      console.log('No barcodes detected.');
    }
  };

  const startScanning = (type) => {
    setScanning(type);
    setDisplayData('');
  };

  const handleBorrow = () => {
    if (studentQR && productQR) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigation.navigate('Home');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        style={styles.camera}
        onBarcodeScanned={scanning ? handleBarCodeScanned : undefined}
      />
      <Text>{displayData}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            studentQR ? styles.disabledButton : styles.enabledButton,
          ]}
          onPress={() => startScanning('student')}
          disabled={!!studentQR}
        >
          <Text style={styles.buttonText}>Scan Student QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !studentQR || productQR ? styles.disabledButton : styles.enabledButton,
          ]}
          onPress={() => startScanning('product')}
          disabled={!studentQR || !!productQR}
        >
          <Text style={styles.buttonText}>Scan Product QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !studentQR || !productQR ? styles.disabledButton : styles.enabledButton,
          ]}
          onPress={handleBorrow}
          disabled={!studentQR || !productQR}
        >
          <Text style={styles.buttonText}>Borrow</Text>
        </TouchableOpacity>
      </View>

      {showConfetti && <ConfettiCannon count={200} origin={{ x: 200, y: 0 }} />}
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
});

export default BorrowScreen;