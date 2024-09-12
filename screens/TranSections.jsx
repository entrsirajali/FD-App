import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TranSections = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.updateText}>This Feature Will Be Updated Shortly</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  updateText: {
    color:'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TranSections;
