import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/Navigation';
import { useCachedResources } from './src/hooks';

export default function App() {

  const isLoadingComplete = useCachedResources();

  if (isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <Navigation/>
        <StatusBar style={ 'light' } backgroundColor={ '#fd6600' }/>
      </SafeAreaProvider>
    );
  }

  return null;
}
