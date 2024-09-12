import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const FDCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [roi, setROI] = useState(8); // Default ROI is 8%
  const [maturityAmount, setMaturityAmount] = useState(0);

  const calculateMaturityAmount = () => {
    const principal = parseFloat(principalAmount);
    const years = parseInt(tenureYears);
    const rate = roi / 100; // Convert ROI percentage to decimal

    if (isNaN(principal) || isNaN(years) || principal <= 0 || years <= 0) {
      // Validation: Ensure principal and years are valid numbers and positive
      alert('Please enter valid principal amount and tenure (in years).');
      return;
    }

    // Calculate maturity amount using compound interest formula
    const maturity = principal * Math.pow((1 + rate), years);
    setMaturityAmount(maturity.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FD Calculator</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Principal Amount (₹)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={principalAmount}
          onChangeText={text => setPrincipalAmount(text)}
        />
        <Text style={styles.label}>Tenure (Years)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter tenure"
          value={tenureYears}
          onChangeText={text => setTenureYears(text)}
        />
        <Text style={styles.label}>Rate of Interest (%)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Default: 8%"
          editable={false}
          value={`${roi}%`}
        />
      </View>
      <TouchableOpacity onPress={calculateMaturityAmount} style={styles.calculateButton}>
        <Text style={styles.buttonText}>Calculate Maturity Amount</Text>
      </TouchableOpacity>
      {maturityAmount > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Maturity Amount:</Text>
          <Text style={styles.result}>{`₹ ${maturityAmount}`}</Text>
        </View>
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
  },
  header: {
    fontSize: 24,
    color:'navy',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color:'green',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  calculateButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default FDCalculator;
