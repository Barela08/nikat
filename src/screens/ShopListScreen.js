import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ShopCard from '../components/ShopCard';
import SkeletonCard from '../components/SkeletonCard';
import { Colors } from '../constants/Colors';
import { getShopsByCategory } from '../services/firestoreService';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const ShopListScreen = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const { subscriptionStatus } = useAppContext();
  const { t } = useLanguage();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchShops();
  }, [category]);

  const fetchShops = async () => {
    try {
      const fetchedShops = await getShopsByCategory(category);
      setShops(fetchedShops);
    } catch (error) {
      console.error('Fetch shops error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchShops();
    setRefreshing(false);
  };

  const handleUnlockPress = () => {
    router.push('/subscription');
  };

  if (loading) {
    const skeletons = [1,2,3,4];
    return (
      <View style={styles.container}>
        <FlatList
          data={skeletons}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Shops ({shops.length})</Text>
      <FlatList
        data={shops}
        renderItem={({ item }) => (
          <ShopCard 
            shop={item} 
            subscriptionStatus={subscriptionStatus} 
            onUnlockPress={handleUnlockPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
      {shops.length === 0 && !loading && (
        <Text style={styles.emptyText}>{t('noShopsAvailable')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ShopListScreen;
