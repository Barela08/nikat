import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Categories } from '../constants/SubscriptionPlans';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { ShopService } from '../services/shopService';
import { validateName } from '../utils/validation';

const RegisterShopScreen = ({ navigation }) => {
  const { strings } = useLanguage();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid shop name (2-100 characters)';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.location || formData.location.trim().length < 3) {
      newErrors.location = 'Please enter a valid location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterShop = async () => {
    try {
      if (!user) {
        Alert.alert('Error', 'Please login first');
        navigation.replace('Login');
        return;
      }

      if (!validateForm()) {
        return;
      }

      setLoading(true);

      const shop = await ShopService.createShop(user.uid, {
        ...formData,
        phone: user.phone,
      });

      Alert.alert(
        'Success',
        'Shop registered! Please subscribe to activate your listing.',
        [
          {
            text: 'Subscribe Now',
            onPress: () => navigation.navigate('Subscription'),
          },
          {
            text: 'Later',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error registering shop:', error);
      Alert.alert('Error', 'Failed to register shop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Register Shop"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Fill in your shop details to get started
        </Text>

        {/* Shop Name */}
        <Input
          label="Shop Name"
          value={formData.name}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, name: text }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          placeholder="e.g., Ram's Grocery"
          icon="🏪"
          error={errors.name}
        />

        {/* Category */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={[
              styles.categoryPicker,
              errors.category && styles.categoryPickerError,
            ]}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={styles.categoryPickerText}>
              {formData.category || 'Select a category'}
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          {showCategoryPicker && (
            <View style={styles.categoryDropdown}>
              {Categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryOption}
                  onPress={() => {
                    setFormData((prev) => ({ ...prev, category: cat.name }));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryOptionText}>
                    {cat.icon} {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        {/* Location */}
        <Input
          label="Location / Address"
          value={formData.location}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, location: text }));
            if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
          }}
          placeholder="e.g., Near Bus Stand"
          icon="📍"
          error={errors.location}
        />

        {/* Description */}
        <Input
          label="Description (Optional)"
          value={formData.description}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, description: text }))
          }
          placeholder="Tell something about your shop..."
        />

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Next Steps:</Text>
          <Text style={styles.infoText}>
            1. Your shop will be registered as inactive
          </Text>
          <Text style={styles.infoText}>
            2. Subscribe to activate and go live
          </Text>
          <Text style={styles.infoText}>
            3. Start receiving customer calls!
          </Text>
        </View>

        {/* Register Button */}
        <Button
          title="Register Shop"
          onPress={handleRegisterShop}
          loading={loading}
          disabled={!formData.name || !formData.category || !formData.location}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  categoryPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: Colors.white,
  },
  categoryPickerError: {
    borderColor: Colors.error,
  },
  categoryPickerText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  categoryDropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.white,
    maxHeight: 200,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginVertical: 2,
  },
});

export default RegisterShopScreen;
