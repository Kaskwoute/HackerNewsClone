import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { StoryContainer } from './containers/StoryContainer';
import { Network } from './components';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const Navigation = () => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state.isInternetReachable && state.isConnected)
    });

    return (() => unsubscribe());
  }, []);

  return (
    <NavigationContainer>
      { !connection && <Network/> }
      <Stack.Navigator initialRouteName={ 'Home' }>
        <Stack.Screen name={ 'Home' } component={ StoryContainer } options={ {
          title: 'Hews',
          headerStyle: styles.headerStyle,
          headerTintColor: '#fff'
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