import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Network = () => {
  return (
    <View style={ styles.network }>
      <Text>No connection :(</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  network: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    flex: 1,
    backgroundColor: 'red'
  },
});

export {
  Network,
}