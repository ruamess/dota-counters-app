import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomAlert = () => {
  return (
    <View style={styles.container}>
      <Text>CustomAlert</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
});

export default CustomAlert;
