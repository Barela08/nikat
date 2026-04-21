import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient'; // Optional for better shimmer

const SkeletonCard = ({ style }) => {
  return (
    <View style={[styles.card, style]}>
      <ShimmerPlaceholder
        style={styles.nameSkeleton}
        duration={1200}
        delay={300}
        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
      />
      <ShimmerPlaceholder
        style={styles.categorySkeleton}
        duration={1200}
        delay={500}
      />
      <View style={styles.metaRow}>
        <ShimmerPlaceholder style={styles.ratingSkeleton} />
        <ShimmerPlaceholder style={styles.distanceSkeleton} />
      </View>
      <View style={styles.buttonRow}>
        <ShimmerPlaceholder style={styles.buttonSkeleton} />
        <ShimmerPlaceholder style={styles.buttonSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
  },
  nameSkeleton: {
    height: 24,
    width: '80%',
    borderRadius: 8,
  },
  categorySkeleton: {
    height: 16,
    width: '60%',
    borderRadius: 8,
    marginVertical: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  ratingSkeleton: {
    height: 20,
    width: 60,
    borderRadius: 10,
  },
  distanceSkeleton: {
    height: 16,
    width: 50,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonSkeleton: {
    height: 48,
    flex: 1,
    borderRadius: 12,
  },
});

export default SkeletonCard;
