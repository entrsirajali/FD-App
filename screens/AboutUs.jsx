import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/Analogo.jpg')} 
            style={styles.logo} 
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to ANA Credit Solution Point</Text>
          <Text style={styles.description}>
            ANA Credit Solution Point is dedicated to providing the best financial services to our customers. Our Fixed Deposit (FD) schemes are tailored to offer you high returns with minimal risk.
          </Text>
          <Text style={styles.description}>
            We offer an impressive 8% Return on Investment (ROI) on our Fixed Deposits. Our schemes are designed to cater to various financial goals and needs, ensuring that your investment grows securely over time.
          </Text>
          <Text style={styles.description}>
            With ANA Credit Solution Point, you can be assured of transparency, security, and excellent customer service. We value your trust and strive to help you achieve your financial aspirations.
          </Text>
          <Text style={styles.description}>
            Thank you for choosing ANA Credit Solution Point. We look forward to serving you and helping you grow your wealth.
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  content: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default AboutUs;
