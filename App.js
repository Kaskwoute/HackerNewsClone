import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Navigation} from './src/Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style={ 'light' } backgroundColor={ '#fd6600' }/>
    </SafeAreaProvider>
  );
}
