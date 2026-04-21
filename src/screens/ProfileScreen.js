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
import Button from '../components/Button';
import Header from '../components/Header';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { formatDate, getDaysRemaining } from '../utils/helpers';

const ProfileScreen = ({ navigation }) => {
  const { strings } = useLanguage();
  const { user, logout, isSubscribed } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: async () => {
          setLoading(true);
          try {
            await logout();
            navigation.replace('Language');
          } catch (error) {
            console.error('Logout error:', error);
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Profile" onBackPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Text style={styles.centerText}>Please login first</Text>
        </View>
      </SafeAreaView>
    );
  }

  const daysRemaining =
    user.planExpiry && isSubscribed
      ? getDaysRemaining(user.planExpiry)
      : null;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name || 'User'}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {user.role === 'shop' ? '🏪 Shop Owner' : '👤 Customer'}
              </Text>
            </View>
          </View>
        </View>

        {/* Subscription Status */}
        <View
          style={[
            styles.statusCard,
            isSubscribed ? styles.activeCard : styles.inactiveCard,
          ]}
        >
          <Text style={styles.statusTitle}>
            {isSubscribed ? '✓ Active' : '⏱️ Inactive'}
          </Text>
          {isSubscribed && user.planExpiry && (
            <View style={styles.statusDetails}>
              <Text style={styles.statusText}>
                Expires: {formatDate(user.planExpiry)}
              </Text>
              {daysRemaining && (
                <Text style={styles.daysRemaining}>
                  {daysRemaining} days remaining
                </Text>
              )}
            </View>
          )}
          {!isSubscribed && (
            <Button
              title="Subscribe Now"
              onPress={() => navigation.navigate('Subscription')}
              style={styles.subscribeButton}
            />
          )}
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>User Type</Text>
            <Text style={styles.detailValue}>
              {user.role === 'shop' ? 'Shop Owner' : 'Customer'}
            </Text>
          </View>
          {user.category && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{user.category}</Text>
            </View>
          )}
          {user.location && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{user.location}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Joined</Text>
            <Text style={styles.detailValue}>
              {user.createdAt
                ? formatDate(user.createdAt)
                : 'Recently'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Edit Profile"
            onPress={() => {
              // Navigate to edit profile screen
            }}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="My Shops"
            onPress={() => navigation.navigate('MyShops')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          variant="danger"
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  phone: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginVertical: 4,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  roleBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  activeCard: {
    backgroundColor: Colors.success + '20',
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  inactiveCard: {
    backgroundColor: Colors.warning + '20',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  statusDetails: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  daysRemaining: {
    fontSize: 13,
    color: Colors.success,
    fontWeight: '600',
  },
  subscribeButton: {
    marginTop: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  centerText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default ProfileScreen;
