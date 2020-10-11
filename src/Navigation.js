import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { StoryContainer } from './containers/StoryContainer';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ 'Home' }>
        <Stack.Screen name={ 'Home' } component={ StoryContainer } options={ {
          title: 'Hews',
          headerStyle: styles.headerStyle,
          headerTintColor: '#fff',
        } }/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#fa8d00',
  },
});

export {
  Navigation,
}