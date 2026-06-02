import './src/core/i18n/i18n';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { LanguageProvider } from './src/app/providers/LanguageProvider';
import { ThemeProvider, useAppTheme } from './src/app/providers/ThemeProvider';
import { RootNavigator } from './src/core/navigation/RootNavigator';

function AppContent() {
  const theme = useAppTheme();

  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar style={theme.resolvedMode === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}