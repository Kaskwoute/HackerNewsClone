import React, { useReducer, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { getUrlBestStories } from '../utils/api';
import { useRequest } from '../hooks';
import { StoryList, BottomBar } from '../components';
import { handlePageReducer, setList } from '../reducers/storyContainer.reducer';

const StoryContainer = ({ navigation }) => {

  // Who should handle error ?
  const { loading, error, data } = useRequest(getUrlBestStories());

  const [state, dispatch] = useReducer(handlePageReducer, handlePageReducer());

  useEffect(() => {
    if (!loading && Array.isArray(data)) dispatch(setList(data));
  }, [loading]);

  // Another useEffect for the 30sc reload, look for react.ref() to set in parent component

  return (
    <View style={ styles.container }>
      <ActivityIndicator size={ 'large' } animating={ loading }/>
      {/*<StoryList data={ data } page={ state.page } chunkSize={ state.chunkSize }/>*/}
      <BottomBar page={ state.page } isLastPage={ state.islastPage } dispatchPageChange={ dispatch }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export {
  StoryContainer,
}