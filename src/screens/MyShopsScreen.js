import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { ShopService } from '../services/shopService';
import { ShopListSkeletonLoader } from '../components/SkeletonLoader';

const MyShopsScreen = ({ navigation }) => {
  const { strings } = useLanguage();
  const { user } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserShops();
  }, [user]);

  const loadUserShops = async () => {
    try {
      setLoading(true);
      if (!user) {
        setShops([]);
        return;
      }

      // In production, create a service method to get user's shops
      // For now, fetch all shops and filter by owner
      // const userShops = await ShopService.getShopsByOwner(user.uid);
      // setShops(userShops);
      setShops([]);
    } catch (error) {
      console.error('Error loading shops:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserShops();
  };

  const handleDeleteShop = (shopId) => {
    Alert.alert('Delete Shop', 'Are you sure you want to delete this shop?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await ShopService.deleteShop(shopId);
            loadUserShops();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete shop');
          }
        },
      },
    ]);
  };

  const renderShopItem = ({ item }) => (
    <View style={styles.shopItem}>
      <View style={styles.shopHeader}>
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{item.name}</Text>
          <Text style={styles.shopCategory}>{item.category}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.isActive ? styles.activeBadge : styles.inactiveBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {item.isActive ? '🟢 Active' : '🔴 Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.shopDetails}>
        <Text style={styles.detailText}>📍 {item.location}</Text>
        <Text style={styles.detailText}>⭐ {item.rating || 4.5}</Text>
      </View>

      {!item.isActive && (
        <Text style={styles.inactiveText}>
          Subscribe to activate this listing
        </Text>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteShop(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🏪</Text>
      <Text style={styles.emptyStateTitle}>No shops yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Register your shop to get started
      </Text>
      <Button
        title="Add Shop"
        onPress={() => navigation.navigate('RegisterShop')}
        style={styles.addButton}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Shops" onBackPress={() => navigation.goBack()} />
        <ShopListSkeletonLoader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Shops" onBackPress={() => navigation.goBack()} />

      <FlatList
        data={shops}
        renderItem={renderShopItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  shopItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  shopCategory: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadge: {
    backgroundColor: Colors.success + '20',
  },
  inactiveBadge: {
    backgroundColor: Colors.error + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  shopDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginVertical: 2,
  },
  inactiveText: {
    fontSize: 12,
    color: Colors.warning,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.error + '20',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: Colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    minWidth: 150,
  },
});

export default MyShopsScreen;
