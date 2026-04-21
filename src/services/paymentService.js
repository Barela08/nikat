import { db } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { getDateWithMonths } from '../utils/helpers';

/**
 * Payment and Subscription Service
 */

export const PaymentService = {
  /**
   * Create payment record
   */
  async createPayment(userId, planId, amount, method = 'UPI') {
    try {
      const paymentRef = collection(db, 'Payments');
      const newPayment = {
        userId,
        planId,
        amount,
        method,
        status: 'pending',
        createdAt: new Date(),
      };

      const docRef = doc(paymentRef);
      await setDoc(docRef, newPayment);
      return { id: docRef.id, ...newPayment };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  /**
   * Update payment status
   */
  async updatePaymentStatus(paymentId, status, notes = '') {
    try {
      const paymentRef = doc(db, 'Payments', paymentId);
      await updateDoc(paymentRef, {
        status,
        updateTime: new Date(),
        notes,
      });
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },

  /**
   * Get payment history
   */
  async getPaymentHistory(userId) {
    try {
      const paymentsRef = collection(db, 'Payments');
      const q = query(paymentsRef, where('userId', '==', userId));
      const snapshots = await getDocs(q);

      return snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  },

  /**
   * Process subscription activation
   */
  async activateSubscription(userId, planId, planDuration) {
    try {
      const expiryDate = getDateWithMonths(planDuration);

      // Update user subscription status
      const userRef = doc(db, 'Users', userId);
      await updateDoc(userRef, {
        isSubscribed: true,
        planExpiry: expiryDate,
        currentPlan: planId,
        subscriptionStartDate: new Date(),
      });

      // Activate all user shops
      const shopsRef = collection(db, 'Shops');
      const q = query(shopsRef, where('ownerId', '==', userId));
      const snapshots = await getDocs(q);

      for (const shopDoc of snapshots.docs) {
        await updateDoc(doc(db, 'Shops', shopDoc.id), {
          isActive: true,
        });
      }

      return expiryDate;
    } catch (error) {
      console.error('Error activating subscription:', error);
      throw error;
    }
  },

  /**
   * Check if subscription is active
   */
  async isSubscriptionActive(userId) {
    try {
      const userRef = doc(db, 'Users', userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return false;

      const userData = userSnap.data();
      if (!userData.isSubscribed || !userData.planExpiry) return false;

      const expiryDate = new Date(userData.planExpiry);
      return expiryDate > new Date();
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  },
};
