import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/Colors';

const SkeletonLoader = ({ height = 100, width = '100%', style }) => {
  return (
    <View style={[styles.skeleton, { height, width }, style]} />
  );
};

const ShopCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <SkeletonLoader height={20} width="60%" style={{ marginBottom: 8 }} />
      <SkeletonLoader height={16} width="40%" style={{ marginBottom: 8 }} />
      <SkeletonLoader height={14} width="50%" style={{ marginBottom: 12 }} />
      <View style={styles.buttonRow}>
        <SkeletonLoader height={40} width="48%" />
        <SkeletonLoader height={40} width="48%" />
      </View>
    </View>
  );
};

const ShopListSkeletonLoader = () => {
  return (
    <View>
      {[1, 2, 3, 4, 5].map((key) => (
        <ShopCardSkeleton key={key} />
      ))}
    </View>
  );
};

const LoadingOverlay = () => {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.mediumGray,
    borderRadius: 8,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
});

export default SkeletonLoader;
export { ShopListSkeletonLoader, ShopCardSkeleton, LoadingOverlay };
