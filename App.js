import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import RootNavigator from './src/navigation/RootNavigator';
import { StorageManager } from './src/utils/storage';
import { Colors } from './src/constants/Colors';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const preparApp = async () => {
      try {
        // Check if language is selected
        const language = await StorageManager.getLanguage();
        if (language && language !== 'en') {
          setIsLanguageSelected(true);
        }

        // Check if user is logged in
        const user = await StorageManager.getUser();
        if (user) {
          setIsLoggedIn(true);
        }

        setIsReady(true);
      } catch (error) {
        console.error('Error preparing app:', error);
        setIsReady(true);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    preparApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <RootNavigator
          isLoggedIn={isLoggedIn}
          isLanguageSelected={isLanguageSelected}
        />
      </AuthProvider>
    </LanguageProvider>
  );
}
