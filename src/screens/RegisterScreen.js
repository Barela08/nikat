import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import BigButton from '../components/BigButton';
import { Colors } from '../constants/Colors';
import { CATEGORIES } from '../constants/Categories';
import { validateName, validateLocation } from '../utils/validation';
import { createUser, createShop } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const USER_TYPES = [
  { label: 'Shop Owner', value: 'shop' },
  { label: 'Service Provider', value: 'service' },
  { label: 'Delivery Helper', value: 'helper' },
];

const RegisterScreen = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: '',
    name: '',
    category: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validateStep = () => {
    if (step === 0) return form.type;
    if (step === 1) return validateName(form.name) && form.category;
    if (step === 2) return validateLocation(form.location);
    return false;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 2) setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Create user
      await createUser({
        phone: user.phoneNumber,
        name: form.name,
        role: form.type,
        category: form.category,
        location: form.location,
      });
      
      // Create shop if shop owner/service
      if (form.type === 'shop' || form.type === 'service') {
        await createShop({
          name: form.name,
          category: form.category,
          location: form.location,
          phone: user.phoneNumber,
        }, user.id);
      }

      Alert.alert('Success', 'Registration complete! Listing active after subscription.');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register as {USER_TYPES[step === 0 ? 0 : form.type]?.label || ''}</Text>
      
      {step === 0 && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Type</Text>
          <Picker
            selectedValue={form.type}
            onValueChange={(value) => updateForm('type', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            {USER_TYPES.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>
      )}

      {step === 1 && (
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => updateForm('name', text)}
            placeholder="Enter name"
          />
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={form.category}
            onValueChange={(value) => updateForm('category', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={form.location}
            onChangeText={(text) => updateForm('location', text)}
            placeholder="Enter location or address"
            multiline
          />
        </View>
      )}

      <BigButton 
        title={step < 2 ? 'Next' : loading ? 'Loading...' : 'Submit'}
        onPress={step < 2 ? handleNext : handleSubmit}
        disabled={loading}
        loading={loading}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 24,
  },
  pickerContainer: {
    marginTop: 20,
  },
  picker: {
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
});

export default RegisterScreen;
