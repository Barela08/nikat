import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { LanguageProvider } from '../src/context/LanguageContext';
import { AppProvider } from '../src/context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="shops/[category]" />
              <Stack.Screen name="register" />
              <Stack.Screen name="subscription" />
              <Stack.Screen name="admin" />
            </Stack>
          </AppProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
