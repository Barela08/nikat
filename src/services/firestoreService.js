import { db } from '../config/firebase';
import { collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, Timestamp, serverTimestamp } from 'firebase/firestore';
import { StorageManager } from '../utils/storage';
import { isSubscriptionActive } from '../utils/helpers';
import { sanitizeInput } from '../utils/validation';

const COLLECTIONS = {
  users: 'users',
  shops: 'shops',
  payments: 'payments',
};

export const createUser = async (userData) => {
  const sanitizedData = {
    ...userData,
    name: sanitizeInput(userData.name),
    phone: sanitizeInput(userData.phone),
    role: userData.role || 'user',
    isSubscribed: false,
    planExpiry: null,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.users), sanitizedData);
  const newUser = { id: docRef.id, ...sanitizedData };
  await StorageManager.setUser(newUser);
  return newUser;
};

export const getUserById = async (userId) => {
  const docSnap = await getDoc(doc(db, COLLECTIONS.users, userId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const getUserByPhone = async (phone) => {
  const q = query(collection(db, COLLECTIONS.users), where('phone', '==', phone));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const updateUserSubscription = async (userId, planId, expiry) {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await updateDoc(userRef, {
    isSubscribed: true,
    planExpiry: Timestamp.fromDate(expiry),
    updatedAt: serverTimestamp(),
  });
  // Refresh local
  const updatedUser = await getUserById(userId);
  if (updatedUser) StorageManager.setUser(updatedUser);
};

export const createShop = async (shopData, ownerId) => {
  const docRef = await addDoc(collection(db, COLLECTIONS.shops), {
    ...shopData,
    ownerId,
    isActive: false, // Requires subscription
    isPremium: false,
    rating: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getShopsByCategory = async (category) => {
  const q = query(collection(db, COLLECTIONS.shops), where('category', '==', category), where('isActive', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const activateShop = async (shopId) => {
  const shopRef = doc(db, COLLECTIONS.shops, shopId);
  await updateDoc(shopRef, { isActive: true, updatedAt: serverTimestamp() });
};

export const createPayment = async (paymentData) => {
  const docRef = await addDoc(collection(db, COLLECTIONS.payments), {
    ...paymentData,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserPayments = async (userId) => {
  const q = query(collection(db, COLLECTIONS.payments), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin functions
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTIONS.users));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateUserRole = async (userId, role) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await updateDoc(userRef, { role });
};

export const deleteShop = async (shopId) => {
  await deleteDoc(doc(db, COLLECTIONS.shops, shopId));
};
