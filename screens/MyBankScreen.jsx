import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyBankScreen = ({ route }) => {
  const [bankDetails, setBankDetails] = useState(null);
  const { userid } = route.params;

  useEffect(() => {
    fetchBankDetails(userid);
  }, []);

  const fetchBankDetails = (userid) => {
    fetch('https://anacreditsolutionpoint.com/Appadmin/get_user-details.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: userid }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setBankDetails(data.data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching bank details:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bank Details</Text>
      {bankDetails ? (
        <View style={styles.bankDetailsContainer}>
          <View style={styles.bankDetail}>
            <Text style={styles.label}>Bank Name:</Text>
            <Text style={styles.value}>{bankDetails.bank_name}</Text>
          </View>
          <View style={styles.bankDetail}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>{bankDetails.account_number}</Text>
          </View>
          <View style={styles.bankDetail}>
            <Text style={styles.label}>IFSC Code:</Text>
            <Text style={styles.value}>{bankDetails.ifsc_code}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading bank details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 26,
    color: '#1a237e',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bankDetailsContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bankDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    color: '#757575',
  },
});

export default MyBankScreen;
