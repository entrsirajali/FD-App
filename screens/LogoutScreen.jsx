// LogoutScreen.js

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        // Clear AsyncStorage or any other logout logic
        await AsyncStorage.removeItem('userid'); // Replace 'userid' with your actual key
        // Navigate to the Login screen and reset the stack to prevent going back
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      } catch (error) {
        console.error('Error logging out:', error);
        // Handle error if needed
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
      <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#4c669f" />
      {/* You can add more UI elements or messages as needed */}
    </View>
  );
};

export default LogoutScreen;
