import { Stack } from 'expo-router';

export default function ShopsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitle: '' }}>
      <Stack.Screen name="[category]" />
    </Stack>
  );
}
