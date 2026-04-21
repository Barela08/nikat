import React from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useNavigation, useRouter } from 'expo-router'; // Or React Nav if used
import BigButton from '../components/BigButton';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { LANGUAGES } from '../utils/i18n';

const LanguageSelectScreen = () => {
  const navigation = useNavigation(); // Switch to router.navigate if Expo Router
  const router = useRouter();
  const { changeLanguage, t } = useLanguage();

  const selectLanguage = (langCode) => {
    changeLanguage(langCode);
    // Navigate to login/home
    router.push('/login'); // Or navigation.navigate('Login')
  };

  return (
    <ImageBackground 
      source={require('../assets/background.png')} // Add asset later
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.logoContainer}>
        <Text style={styles.appName}>NIKAT</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <BigButton 
          title="🇮🇳 हिंदी" 
          onPress={() => selectLanguage('hi')}
          style={styles.langButton}
        />
        <BigButton 
          title="🇬🇧 English" 
          onPress={() => selectLanguage('en')}
          style={styles.langButton}
        />
        <BigButton 
          title="🟠 मराठी" 
          onPress={() => selectLanguage('mr')}
          style={styles.langButton}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  langButton: {
    backgroundColor: Colors.secondary,
  },
});

export default LanguageSelectScreen;
