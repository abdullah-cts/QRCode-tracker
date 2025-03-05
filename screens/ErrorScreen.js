import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ErrorPage() {
  const navigation = useNavigation();

  const handleReturnHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with your home screen's route name
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.errorText, { color: 'red' }]}>
        Something went wrong. Please try again later.
      </Text>
      <Button title="Return Home" onPress={handleReturnHome} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '80%',
  },
});