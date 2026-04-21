import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { formatCurrency } from '../utils/helpers';

const PlanCard = ({ plan, onPress, selected }) => {
  const isBest = plan.best;

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        selected && styles.selected, 
        isBest && styles.bestPlan
      ]} 
      onPress={() => onPress(plan)}
      activeOpacity={0.8}
    >
      {isBest && <View style={styles.bestBadge}>BEST</View>}
      <Text style={styles.name}>{plan.name}</Text>
      <Text style={styles.price}>{formatCurrency(plan.price)}</Text>
      <Text style={styles.duration}>{plan.duration / 30} {plan.duration === 30 ? 'Month' : 'Months'}</Text>
      <Text style={styles.feature}>Top listing + Premium badge</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  selected: {
    borderColor: Colors.primary,
    shadowOpacity: 0.3,
  },
  bestPlan: {
    borderColor: Colors.tertiary,
  },
  bestBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: Colors.tertiary,
    color: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  duration: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default PlanCard;
