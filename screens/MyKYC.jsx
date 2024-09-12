import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

const MyKYC = () => {
  const route = useRoute();
  const { userid } = route.params;

  const [kycDetails, setKYCDetails] = useState({
    aadharNumber: '',
    panNumber: '',
    realName: '',
  });

  useEffect(() => {
    fetchKYCDetails(userid);
  }, [userid]);

  const fetchKYCDetails = (userid) => {
    fetch('https://anacreditsolutionpoint.com/Appadmin/get_user-details.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(`Network response was not ok: ${text}`); });
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setKYCDetails({
            Name: data.data.username,
            MobileNumber: data.data.mobile_number,
            aadharNumber: data.data.adhar_card_number,
            PanNumber: data.data.pan_card_number,
            dob: data.data.dob,
            gender: data.data.gender,
            email: data.data.email,
            add: data.data.address,
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching KYC details:', error);
        Alert.alert('Error', `Failed to fetch KYC details: ${error.message}`);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <View style={styles.card}>
          <Text style={styles.title}>KYC Details</Text>
          <View style={styles.details}>
            <Text style={styles.detail}>Name: {kycDetails.Name}</Text>
            <Text style={styles.detail}>D.O.B: {kycDetails.dob}</Text>
            <Text style={styles.detail}>Gender: {kycDetails.gender}</Text>
            <Text style={styles.detail}>Mobile Number: {kycDetails.MobileNumber}</Text>
            <Text style={styles.detail}>Email: {kycDetails.email}</Text>
            <Text style={styles.detail}>Aadhar Card Number: {kycDetails.aadharNumber}</Text>
            <Text style={styles.detail}>PAN Card Number: {kycDetails.PanNumber}</Text>
            <Text style={styles.detail}>Address: {kycDetails.add}</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  gradient: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
});

export default MyKYC;
