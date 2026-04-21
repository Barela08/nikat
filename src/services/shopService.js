import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from 'firebase/firestore';
import { sanitizeInput } from '../utils/validation';

/**
 * Shop Management Service
 */

export const ShopService = {
  /**
   * Get shops by category
   */
  async getShopsByCategory(categoryName) {
    try {
      const shopsRef = collection(db, 'Shops');
      const q = query(
        shopsRef,
        where('category', '==', categoryName),
        where('isActive', '==', true),
        orderBy('isPremium', 'desc'),
        orderBy('rating', 'desc')
      );
      const snapshots = await getDocs(q);
      return snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting shops:', error);
      return [];
    }
  },

  /**
   * Get all shops
   */
  async getAllShops() {
    try {
      const shopsRef = collection(db, 'Shops');
      const q = query(
        shopsRef,
        where('isActive', '==', true),
        orderBy('isPremium', 'desc'),
        limit(50)
      );
      const snapshots = await getDocs(q);
      return snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting shops:', error);
      return [];
    }
  },

  /**
   * Get shop details
   */
  async getShopDetails(shopId) {
    try {
      const shopRef = doc(db, 'Shops', shopId);
      const shopSnap = await getDoc(shopRef);
      return shopSnap.exists()
        ? { id: shopSnap.id, ...shopSnap.data() }
        : null;
    } catch (error) {
      console.error('Error getting shop details:', error);
      throw error;
    }
  },

  /**
   * Create new shop
   */
  async createShop(ownerId, shopData) {
    try {
      const sanitizedData = {
        ownerId,
        name: sanitizeInput(shopData.name),
        category: shopData.category,
        location: sanitizeInput(shopData.location),
        phone: shopData.phone,
        rating: 4.5,
        isActive: false, // Requires subscription to activate
        isPremium: false,
        createdAt: new Date(),
        description: sanitizeInput(shopData.description || ''),
      };

      const shopsRef = collection(db, 'Shops');
      const newDocRef = doc(shopsRef);
      await setDoc(newDocRef, sanitizedData);
      return { id: newDocRef.id, ...sanitizedData };
    } catch (error) {
      console.error('Error creating shop:', error);
      throw error;
    }
  },

  /**
   * Update shop
   */
  async updateShop(shopId, updateData) {
    try {
      const shopRef = doc(db, 'Shops', shopId);
      const sanitizedUpdate = {
        name: updateData.name ? sanitizeInput(updateData.name) : undefined,
        location: updateData.location ? sanitizeInput(updateData.location) : undefined,
        description: updateData.description
          ? sanitizeInput(updateData.description)
          : undefined,
        ...updateData,
      };

      // Remove undefined values
      Object.keys(sanitizedUpdate).forEach(
        (key) => sanitizedUpdate[key] === undefined && delete sanitizedUpdate[key]
      );

      await updateDoc(shopRef, sanitizedUpdate);
    } catch (error) {
      console.error('Error updating shop:', error);
      throw error;
    }
  },

  /**
   * Delete shop
   */
  async deleteShop(shopId) {
    try {
      const shopRef = doc(db, 'Shops', shopId);
      await deleteDoc(shopRef);
    } catch (error) {
      console.error('Error deleting shop:', error);
      throw error;
    }
  },

  /**
   * Activate shop (requires active subscription)
   */
  async activateShop(shopId) {
    try {
      const shopRef = doc(db, 'Shops', shopId);
      await updateDoc(shopRef, {
        isActive: true,
      });
    } catch (error) {
      console.error('Error activating shop:', error);
      throw error;
    }
  },

  /**
   * Search shops by name
   */
  async searchShops(searchTerm) {
    try {
      const shopsRef = collection(db, 'Shops');
      const q = query(shopsRef, where('isActive', '==', true));
      const snapshots = await getDocs(q);

      const results = snapshots.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return results;
    } catch (error) {
      console.error('Error searching shops:', error);
      return [];
    }
  },
};
