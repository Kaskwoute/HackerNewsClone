import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Network = () => {
  return (
    <View style={ styles.network }>
      <Text style={ styles.white }>No connection :(</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  network: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: '5%',
    width: '100%',
    backgroundColor: '#333333',
    flex: 1,
    justifyContent: 'center'
  },
  white: {
    color: '#fff',
    fontSize: 15
  }
});

export {
  Network,
}