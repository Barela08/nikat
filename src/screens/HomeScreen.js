import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '../constants/Categories';
import CategoryCard from '../components/CategoryCard';
import BigButton from '../components/BigButton';
import { Colors } from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { subscriptionStatus } = useAppContext();

  const handleCategoryPress = (categoryId) => {
    router.push(`/shops/${categoryId}`);
  };

  const handleAddShop = () => {
    router.push('/register');
  };

  const handleSubscription = () => {
    router.push('/subscription');
  };

  if (authLoading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appName}>NIKAT</Text>
        <View style={styles.rightHeader}>
          {!subscriptionStatus.isActive ? (
            <BigButton title="Subscribe" onPress={handleSubscription} style={styles.subButton} />
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={handleAddShop}>
              <Text style={styles.addButtonText}>➕ Add Shop</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <Text style={styles.title}>{t('categories')}</Text>
      
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={handleCategoryPress} />
        )}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginLeft: 20,
    marginVertical: 20,
  },
  grid: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
