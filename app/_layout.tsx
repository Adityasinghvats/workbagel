import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './globals.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient, useAppState } from '@/lib/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // hook into app state changes for refecth on focus
  useAppState();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="tech/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="slot/add/addSlot" options={{ headerShown: false }} />
          <Stack.Screen name="slot/slots" options={{ headerShown: false }} />
          <Stack.Screen name="login/login" options={{ headerShown: false }} />
          <Stack.Screen name="register/signup" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
