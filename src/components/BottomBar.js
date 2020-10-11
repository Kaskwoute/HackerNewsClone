import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { pageNext, pagePrevious } from '../reducers/storyContainer.reducer';

const BottomBar = ({ page, isLastPage, dispatchPageChange }) => {

  // TODO: fix the css
  return (
    <View style={ styles.bottomBar }>
      { page > 0 &&
      <TouchableWithoutFeedback onPress={ () => dispatchPageChange(pagePrevious()) }>
        <Text style={ styles.white }>Prev</Text>
      </TouchableWithoutFeedback>
      }

      { !isLastPage &&
      <TouchableWithoutFeedback onPress={ () => dispatchPageChange(pageNext()) }>
        <Text style={ styles.white }>Next</Text>
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
});

export {
  BottomBar,
}