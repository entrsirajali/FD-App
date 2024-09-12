// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Analogo.jpg')} style={styles.logo} />
      <View style={styles.textWrapper}>
        <MaskedView
          maskElement={
            <View style={styles.maskContainer}>
              <Text style={[styles.welcomeText, styles.textMask]}>Welcome to</Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#00FF00', '#008000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.textContainer}
          >
            <Text style={[styles.welcomeText, { opacity: 0 }]}>Welcome to</Text>
          </LinearGradient>
        </MaskedView>
        <MaskedView
          maskElement={
            <View style={styles.maskContainer}>
              <Text style={[styles.anaText, styles.textMask]}>ANA Credit</Text>
              <Text style={[styles.anaText, styles.textMask]}>Solution</Text>
              <Text style={[styles.anaText, styles.textMask]}>Point</Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#00FF00', '#008000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.textContainer}
          >
            <Text style={[styles.anaText, { opacity: 0 }]}>ANA Credit</Text>
            <Text style={[styles.anaText, { opacity: 0 }]}>Solution</Text>
            <Text style={[styles.anaText, { opacity: 0 }]}>Point</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.designedByText}>Designed By : EAdsClub Digital Marketing Agency</Text>
        <Text style={styles.designedByText}>Developer : Siraj Ali</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
  },
  textWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
  },
  anaText: {
    fontSize: 36,
  },
  maskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMask: {
    color: 'black',
    backgroundColor: 'transparent',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default SplashScreen;
