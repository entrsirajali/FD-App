import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import { formatCurrency, calculateMaturityAmount, calculateFinalMaturityAmount } from './utils';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { userid } = route.params;

  useEffect(() => {
    fetchUserData(userid);
  }, [userid]);

  
  const backAction = () => {
    BackHandler.exitApp(); // Close the app
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  const fetchUserData = (userid) => {
    fetch('https://anacreditsolutionpoint.com/Appadmin/get_user-details.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setUserData(data.data);
          setError(null);
        } else {
          throw new Error(data.message);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error.message);
        setIsLoading(false);
        setError('Failed to fetch user data. Please check your internet connection and try again.');
      });
  };

  const calculateRemainingDays = (bookedDate, duration) => {
    const bookedMoment = moment(bookedDate);
    const now = moment();
    const diffDays = now.diff(bookedMoment, 'days');
    return duration - diffDays;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeFD = async () => {
    try {
      const requestBody = {
        username: userData.username,
        mobile_number: userData.mobile_number,
        bank_name: userData.bank_name,
        bank_account: userData.account_number,
        ifsc: userData.ifsc_code,
        fd_amount: userData.amount,
        current_amount: calculateMaturityAmount(userData.amount, userData.roi, userData.booked_date),
        booked_date: userData.booked_date,
        fd_type: userData.fd_type,
        action: 1, // Assuming action 1 represents closing FD
      };
  
      console.log('Data being sent to server:', JSON.stringify(requestBody));
  
      const response = await fetch('https://appadmin.anacreditsolutionpoint.com/payment-request-incoming.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.text();
      console.log('Response from server:', data);
  
      if (data === 'Data inserted successfully') {
        Alert.alert(
          'FD Closed Successfully',
          'FD has been closed. Your amount will be transferred within 24 working hours.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Disable back button
          
                // Navigate to home screen or perform other actions
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              },
            },
          ],
          { cancelable: false }
        );
      } else if (data === 'Data already exists') {
        Alert.alert(
          'FD Close Status Pending',
          'FD closure request has already been processed for this account.',
          [
            {
              text: 'OK',
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('FD Closed Successfully',
          'FD has been closed. Your amount will be transfered within 24 working hours.');
      }
  
      // Refetch user data after closing FD
      fetchUserData(userid);
  
    } catch (error) {
   
      Alert.alert('Error', 'Failed to close FD. Please try again later.');
    }
  };
  

  // Function to handle back button press
  const handleBackButton = () => {
    // Prevent going back if FD closure is successful
    return true;
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName, { userid });
    closeSidebar();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.logoContainer}>
          <Image source={require('../assets/Analogo.jpg')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.appName}>ANA Credit Solution Point</Text>
      </View>

      {/* Main Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4c669f" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : userData ? (
        <ScrollView contentContainerStyle={styles.mainContent}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.fdCard}>
            <View style={styles.fdHeader}>
              <Text style={styles.fdHeading}>My FD Details</Text>
            </View>
            <View style={styles.fdDetails}>
              <Text style={styles.fdDetail}>
                Current Maturity Amount : {formatCurrency(calculateMaturityAmount(userData.amount, userData.roi, userData.booked_date))}
              </Text>
              <Text style={styles.fdDetail}>Invested Amount : {formatCurrency(userData.amount)}</Text>
              <Text style={styles.fdDetail}>ROI : {userData.roi}% Per Annum</Text>
              <Text style={styles.fdDetail}>Invested at : {moment(userData.booked_date).format('Do MMM YYYY')}</Text>
              <Text style={styles.fdDetail}>Tenure : {userData.duration} days</Text>
              <Text style={styles.fdDetail}>
                Final Maturity Amount: {formatCurrency(calculateFinalMaturityAmount(userData.amount, userData.roi, userData.duration))}
              </Text>
              <Text style={styles.fdDetail}>
                Remaining Days: {calculateRemainingDays(userData.booked_date, userData.duration)}
              </Text>
              {(userData.fd_type === 'Long Term' && calculateRemainingDays(userData.booked_date, userData.duration) === 0) ||
              (userData.fd_type === 'Short Term' && moment().diff(moment(userData.booked_date), 'days') >= 7) ? (
                <TouchableOpacity style={styles.closeFdButton} onPress={closeFD}>
                  <Text style={styles.closeFdButtonText}>Close FD</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </LinearGradient>

          <View style={styles.fdInfo}>
            <Text style={styles.sectionHeader}>What is a Fixed Deposit (FD)?</Text>
            <Text style={styles.paragraph}>
              A Fixed Deposit (FD) is a financial instrument provided by banks or Non-Banking Financial Companies (NBFCs) which provides investors with a higher rate of interest than a regular savings account, until the given maturity date. It is a popular investment option due to its safety and higher returns.
            </Text>
            <Text style={styles.sectionHeader}>Norms for Fixed Deposits</Text>
            <Text style={styles.subHeader}>1. Minimum and Maximum Deposit Amount</Text>
            <Text style={styles.paragraph}>
              Most banks have a minimum deposit amount that varies, but it is generally around ₹5,000 for a regular FD. There is usually no upper limit to the amount that can be invested in an FD.
            </Text>
            <Text style={styles.subHeader}>2. Tenure</Text>
            <Text style={styles.paragraph}>
              The tenure for FDs can range from 7 days to 10 years. The interest rate depends on the tenure, with longer tenures typically offering higher interest rates.
            </Text>
            <Text style={styles.subHeader}>3. Interest Rate</Text>
            <Text style={styles.paragraph}>
              Interest rates on FDs vary depending on the bank and the tenure of the FD. Senior citizens generally receive a higher interest rate.
            </Text>
            <Text style={styles.subHeader}>4. Premature Withdrawal</Text>
            <Text style={styles.paragraph}>
              Premature withdrawal of FDs is allowed, but it usually incurs a penalty. The penalty amount can vary from bank to bank.
            </Text>
            <Text style={styles.subHeader}>5. Renewal</Text>
            <Text style={styles.paragraph}>
              FDs can be renewed upon maturity. Banks may offer an automatic renewal option, where the FD is renewed for the same period as the original deposit at the prevailing interest rates.
            </Text>
            <Text style={styles.subHeader}>6. Loan Against FD</Text>
            <Text style={styles.paragraph}>
              Investors can avail loans against their FDs. Generally, banks offer loans up to 90% of the FD amount.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load user data.</Text>
        </View>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSidebar}>
          <View style={styles.sidebar}>
            <View style={styles.profile}>
              <Image source={require('../assets/Analogo.jpg')} style={styles.profileImage} />
              <Text style={styles.profileText}>{userData?.username}</Text>
            </View>
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('MyFDdetails')}>
                <Text style={styles.menuItemText}>My FD Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('MyBankScreen')}>
                <Text style={styles.menuItemText}>Bank Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('MyKYC')}>
                <Text style={styles.menuItemText}>My KYC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('FDCalculator')}>
                <Text style={styles.menuItemText}>FD Calculator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AboutUs')}>
                <Text style={styles.menuItemText}>About us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('TermsAndConditions')}>
                <Text style={styles.menuItemText}>Terms and Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('TranSections')}>
                <Text style={styles.menuItemText}>Transaction Sections</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Help')}>
                <Text style={styles.menuItemText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Logout')}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#4c669f',
    paddingHorizontal: 5,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 20,
    height: 80,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginLeft: 51, // Adjusted to ensure 1px space from the logo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  fdCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  fdHeader: {
    marginBottom: 10,
  },
  fdHeading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  fdDetails: {
    marginTop: 10,
  },
  fdDetail: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeFdButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeFdButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sidebar: {
    backgroundColor: '#fff',
    height: '70%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 15,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'navy',
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuItemText: {
    fontSize: 19,
    color: '#3b5998',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#3b5998',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    color: 'green',
  },
});

export default MainPage;
