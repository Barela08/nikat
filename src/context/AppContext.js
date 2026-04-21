import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { isSubscriptionActive, getDaysRemaining } from '../utils/helpers';
import { StorageManager } from '../utils/storage';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState({ isActive: false, daysLeft: 0 });

  useEffect(() => {
    const updateUser = async () => {
      if (authUser) {
        const storedUser = await StorageManager.getUser();
        setCurrentUser(storedUser || authUser);
        if (storedUser?.planExpiry) {
          const active = isSubscriptionActive(storedUser.planExpiry);
          const daysLeft = getDaysRemaining(storedUser.planExpiry);
          setSubscriptionStatus({ isActive: active, daysLeft });
        }
      } else {
        setCurrentUser(null);
        setSubscriptionStatus({ isActive: false, daysLeft: 0 });
      }
    };
    updateUser();
  }, [authUser]);

  const value = { currentUser, subscriptionStatus };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
