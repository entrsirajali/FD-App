import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#d3d3d3', '#ffffff']} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Terms and Conditions</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.description}>
            These Terms and Conditions ("Terms") govern your use of the ANA Credit app ("App") and the services provided by ANA Credit Solution Point ("Company", "we", "us", or "our"). By using the App, you agree to comply with and be bound by these Terms.
          </Text>

          <Text style={styles.sectionTitle}>2. Eligibility</Text>
          <Text style={styles.description}>
            You must be at least 18 years old to use the App and our services. By using the App, you represent and warrant that you are at least 18 years old.
          </Text>

          <Text style={styles.sectionTitle}>3. Account Registration</Text>
          <Text style={styles.description}>
            To use certain features of the App, you may be required to register an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate and complete.
          </Text>

          <Text style={styles.sectionTitle}>4. Fixed Deposits</Text>
          <Text style={styles.description}>
            Our Fixed Deposit schemes offer an 8% Return on Investment (ROI). The terms and conditions of each Fixed Deposit will be specified in the relevant agreement you enter into with us.
          </Text>

          <Text style={styles.sectionTitle}>5. Privacy</Text>
          <Text style={styles.description}>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </Text>

          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <Text style={styles.description}>
            To the fullest extent permitted by law, ANA Credit shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the App or our services.
          </Text>

          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.description}>
            We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on the App. You are advised to review these Terms periodically for any changes. Changes to these Terms are effective when they are posted on this page.
          </Text>

          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.description}>
            If you have any questions about these Terms, please contact us at support@anacreditsolutionpoint.com.
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  gradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  content: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37474f',
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#455a64',
    textAlign: 'justify',
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default TermsAndConditions;
