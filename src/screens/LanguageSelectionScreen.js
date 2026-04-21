import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Strings } from '../constants/Strings';
import Button from '../components/Button';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { changeLanguage } = useLanguage();

  const languages = [
    { code: 'hi', name: '🇮🇳 हिंदी', label: 'Hindi' },
    { code: 'en', name: '🇬🇧 English', label: 'English' },
    { code: 'mr', name: '🟠 मराठी', label: 'Marathi' },
  ];

  const handleLanguageSelect = async (languageCode) => {
    try {
      setLoading(true);
      setSelectedLanguage(languageCode);
      await changeLanguage(languageCode);

      // Navigate to login screen
      setTimeout(() => {
        navigation.replace('Login');
      }, 500);
    } catch (error) {
      console.error('Error selecting language:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/App Name */}
        <View style={styles.logoSection}>
          <Text style={styles.appName}>NIKAT</Text>
          <Text style={styles.tagline}>Jo chahiye, sab paas</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Select your preferred language / अपनी भाषा चुनें / आपली भाषा निवडा
        </Text>

        {/* Language Options */}
        <View style={styles.languageOptions}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                selectedLanguage === lang.code &&
                  styles.languageButtonSelected,
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
              activeOpacity={0.8}
              disabled={loading}
            >
              <Text style={styles.languageButtonText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        {selectedLanguage && (
          <Button
            title={Strings[selectedLanguage]?.continue || 'Continue'}
            onPress={() => handleLanguageSelect(selectedLanguage)}
            loading={loading}
            style={styles.continueButton}
          />
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          by HackifyPro
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  languageOptions: {
    marginBottom: 32,
    gap: 12,
  },
  languageButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  languageButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  languageButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  continueButton: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default LanguageSelectionScreen;
