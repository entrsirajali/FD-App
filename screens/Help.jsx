import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

const Help = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subHeader}>How to Use the Application</Text>
        <Text style={styles.description}>Welcome to our application. Here are some tips to help you get started:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Navigate through the different sections using the sidebar.</Text>
          <Text style={styles.listItem}>• Use the dashboard to get an overview of your data.</Text>
          <Text style={styles.listItem}>• For detailed information, click on the specific section you are interested in.</Text>
        </View>

        <Text style={styles.subHeader}>Frequently Asked Questions</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I reset my password?</Text> You can reset your password by clicking on the 'Forgot Password' link on the login page.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I contact support?</Text> You can contact support by emailing support@example.com.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Where can I find more tutorials?</Text> More tutorials are available in the 'Tutorials' section of the sidebar.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I update my profile?</Text> Navigate to the 'Profile' section and click on 'Edit Profile'.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I book a Fixed Deposit?</Text> Go to the 'Book a FD' section and use the sliders to set your amount, ROI, and tenure.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I view my existing Fixed Deposits?</Text> Go to the 'My FD' section to see all your current Fixed Deposits.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I change my mobile number?</Text> Go to the 'Profile' section and click on 'Edit Profile' to update your mobile number.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I enable notifications?</Text> Navigate to the 'Settings' section and toggle the notification settings.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>How do I log out of the application?</Text> Click on the 'Logout' button in the sidebar menu.
          </Text>
        </View>

        <Text style={styles.subHeader}>Contact Support</Text>
        <Text style={styles.description}>If you need further assistance, you can contact us through the following options:</Text>
        <View style={styles.list}>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/9716202202')}>
            <Text style={styles.link}><Text style={styles.bold}>WhatsApp Chat:</Text> Chat with us on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+919716202202')}>
            <Text style={styles.link}><Text style={styles.bold}>Call Us:</Text> 9716202202</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  content: {
    marginTop: 10,
  },
  subHeader: {
    fontSize: 26,
    color: '#2c3e50',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'justify',
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    marginVertical: 8,
    lineHeight: 24,
    fontSize: 16,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  link: {
    color: '#3498db',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Help;
