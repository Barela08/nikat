import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { formatPhoneNumber, maskPhoneNumber, openDialer, openWhatsApp } from '../utils/helpers';
import BigButton from './BigButton';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assume configured

const ShopCard = ({ shop, subscriptionStatus, onUnlockPress, style }) => {
  const isLocked = !subscriptionStatus.isActive;
  const displayPhone = isLocked ? maskPhoneNumber(shop.phone || '') : formatPhoneNumber(shop.phone || '');

  const handleCall = () => Linking.openURL(openDialer(shop.phone));
  const handleWhatsApp = () => Linking.openURL(openWhatsApp(shop.phone));

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.name}>{shop.name}</Text>
      <Text style={styles.category}>{shop.category}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.rating}>⭐ {shop.rating || 0}</Text>
        <Text style={styles.distance}>{shop.distance || '1.2'} km</Text>
      </View>
      
      {isLocked ? (
        <View style={styles.lockedContainer}>
          <Icon name="lock" size={24} color={Colors.warning} />
          <Text style={styles.lockedText}>Contact hidden</Text>
          <BigButton title="Unlock to Contact" onPress={onUnlockPress} />
        </View>
      ) : (
        <View style={styles.buttonsRow}>
          <BigButton 
            title="📞 Call" 
            onPress={handleCall} 
            style={styles.actionButton}
            textStyle={styles.actionButtonText}
          />
          <BigButton 
            title="💬 WhatsApp" 
            onPress={handleWhatsApp} 
            style={[styles.actionButton, styles.whatsappButton]}
            textStyle={styles.actionButtonText}
          />
        </View>
      )}
      
      {shop.address && (
        <Text style={styles.address}>{isLocked ? 'Address hidden' : shop.address}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  lockedContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  lockedText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginVertical: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.success,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  actionButtonText: {
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default ShopCard;
