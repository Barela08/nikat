import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BigButton from '../components/BigButton';
import { Colors } from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import { validatePhone, sanitizePhone } from '../utils/validation';
import { sendOTP, verifyOTP } from '../services/authService';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleSendOTP = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter valid Indian phone number');
      return;
    }
    const sanitized = '+91' + sanitizePhone(phone);
    setLoading(true);
    const result = await sendOTP(sanitized, 'recaptcha-ref'); // Ref to invisible recaptcha div
    setLoading(false);
    if (result.success) {
      setConfirmation(result.confirmation);
      setStep('otp');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) {
      Alert.alert('Invalid OTP', 'Enter full OTP');
      return;
    }
    setLoading(true);
    const result = await verifyOTP(confirmation, otp);
    setLoading(false);
    if (result.success) {
      router.push('/home');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>
      <Text style={styles.subtitle}>Enter your phone number</Text>
      
      {step === 'phone' ? (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter 10 digit phone"
              maxLength={10}
            />
            <View id="recaptcha-container" style={{ height: 0 }} />
          </View>
          <BigButton 
            title={loading ? 'Loading...' : `Send OTP →`}
            onPress={handleSendOTP}
            loading={loading}
          />
        </>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter OTP"
          />
        </View>
        <BigButton 
          title={loading ? t('loading') : `${t('verifyOTP')} →`}
          onPress={handleVerifyOTP}
          loading={loading}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  phoneInput: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  otpInput: {
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
  },
});

export default LoginScreen;
