import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Linking } from 'react-native';
import { SUBSCRIPTION_PLANS } from '../constants/SubscriptionPlans';
import PlanCard from '../components/PlanCard';
import BigButton from '../components/BigButton';
import { Colors } from '../constants/Colors';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { updateUserSubscription } from '../services/firestoreService';
import { formatCurrency } from '../utils/helpers';

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAppContext();
  const { user } = useAuth();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !user) return;
    setLoading(true);
    try {
      // Stub payment (replace with Razorpay/UPI)
      const expiryDate = getDateWithMonths(selectedPlan.duration);
      await updateUserSubscription(currentUser.id, selectedPlan.id, expiryDate);
      
      // Log payment
      // await createPayment({ ... });

      Alert.alert('Success', `Subscribed to ${selectedPlan.name}!`);
      Linking.openURL('upi://pay?pa=dummy@paytm&am=${selectedPlan.price}&cu=INR&tn=NIKAT Subscription'); // Stub
    } catch (error) {
      Alert.alert('Error', 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Plan</Text>
      <Text style={styles.subtitle}>Get premium visibility</Text>
      
      <FlatList
        data={SUBSCRIPTION_PLANS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlanCard 
            plan={item}
            onPress={handlePlanSelect}
            selected={selectedPlan?.id === item.id}
          />
        )}
        contentContainerStyle={styles.plansList}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
      
      <BigButton 
        title={`${formatCurrency(selectedPlan?.price || 0)} Subscribe`}
        onPress={handleSubscribe}
        disabled={!selectedPlan || loading}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  plansList: {
    paddingVertical: 20,
  },
});

export default SubscriptionScreen;
