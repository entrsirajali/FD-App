import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userid = await AsyncStorage.getItem('userid');
    if (userid) {
      navigation.navigate('MainPage', { userid: userid });
    }
  };

  const handleMobileChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setMobile(cleaned);
    }
  };

  const handleVerify = async () => {
    if (!mobile) {
      Alert.alert('Validation Error', 'Please enter your mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://anacreditsolutionpoint.com/Appadmin/verify_mobile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `mobile=${mobile}`,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status === 'success') {
        if (data.fd_status === 'Closed') {
          Alert.alert('FD Closed', 'Your FD has been closed. Please contact support.');
          setIsLoading(false);
          return;
        }

        await AsyncStorage.setItem('userid', data.userid.toString());
        navigation.navigate('MainPage', { userid: data.userid });
      } else {
        Alert.alert('Verification Failed', data.message || 'Mobile number not found');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Analogo.jpg')} style={styles.logo} />
      <Text style={styles.letslogin}>Verify your Mobile Number to Login</Text>
      <View style={styles.inputContainer}>
        <CountryFlag isoCode="IN" size={20} style={styles.flag} />
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="green"
          value={mobile}
          onChangeText={handleMobileChange}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      <Button title={isLoading ? "Verifying..." : "Verify"} onPress={handleVerify} disabled={isLoading} />
      <TouchableOpacity>
        <Text style={styles.link1}>Welcome To </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link2}>ANA Credit Solution Point</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.designedByText}>Designed By : EAdsClub Digital Marketing Agency</Text>
        <Text style={styles.designedByText}>Developer : Siraj Ali</Text>
      </View>

      {isLoading && <ActivityIndicator style={styles.loader} size="large" color="green" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  letslogin: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'navy',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  flag: {
    marginRight: 5,
  },
  prefix: {
    marginRight: 5,
    color: 'green',
  },
  input: {
    flex: 1,
    color: 'green',
  },
  link1: {
    color: 'green',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 10,
  },
  link2: {
    color: 'green',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  designedByText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
