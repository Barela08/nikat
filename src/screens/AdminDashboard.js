import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAllUsers, updateUserRole } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';
import BigButton from '../components/BigButton';
import { Colors } from '../constants/Colors';

const AdminDashboard = () => {
  const { currentUser } = useAppContext();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = (userId) => {
    Alert.alert('Confirm', 'Make admin?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => updateUserRole(userId, 'admin') }
    ]);
  };

  const toggleActive = (shopId) => {
    // Stub activateShop
  };

  if (!user || user.role !== 'admin') return <Text>Access Denied</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.stats}>Total Users: {users.length}</Text>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text>{item.name} - {item.phone}</Text>
            <Text>Role: {item.role}</Text>
            {item.role !== 'admin' && (
              <BigButton title="Make Admin" onPress={() => makeAdmin(item.id)} />
            )}
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stats: {
    fontSize: 18,
    marginVertical: 20,
  },
  userCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
  },
});

export default AdminDashboard;
