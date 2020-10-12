import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { pageNext, pagePrevious } from '../reducers/storyContainer.reducer';

const BottomBar = ({ page, isLastPage, dispatchPageChange, isLoading }) => {

  return (
    <View style={ styles.bottomBar }>
      { page > 0 &&
      <TouchableWithoutFeedback onPress={ () => { if (!isLoading) dispatchPageChange(pagePrevious()) } }>
        <Text style={ isLoading ? styles.grey : styles.white }>Prev</Text>
      </TouchableWithoutFeedback>
      }

      { !isLastPage &&
      <TouchableWithoutFeedback onPress={ () => { if (!isLoading) dispatchPageChange(pageNext()) } }>
        <Text style={ isLoading ? styles.grey : styles.white }>Next</Text>
      </TouchableWithoutFeedback>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',
    height: '5%',
    backgroundColor: '#fa8d00',
    alignItems: 'center',
  },
  white: {
    color: '#fff',
  },
  grey: {
    color: '#dadada',
  },
});

export {
  BottomBar,
}