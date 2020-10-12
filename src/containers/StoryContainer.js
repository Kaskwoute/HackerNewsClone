import React, { useReducer, useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getUrlBestStories } from '../utils/api';
import { useRequest } from '../hooks';
import { StoryList, BottomBar } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { handlePageReducer, setList } from '../reducers/storyContainer.reducer';


const StoryContainer = ({ navigation }) => {
  // Use to prevent next / prev while list is still loading
  const [listLoading, setListLoading] = useState(false);

  // Hack to make useEffect trigger, used for list reload
  const [flagRequest, setFlagRequest] = useState(false);

  const [state, dispatch] = useReducer(handlePageReducer, handlePageReducer());

  useEffect(() => {
    const interval = setInterval(() => {
      setFlagRequest(!flagRequest);
    }, 30000);

    return(() => clearInterval(interval));
  }, []);

  // Button for topBar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setFlagRequest(flag => !flag)}>
          <MaterialCommunityIcons name={ 'reload' } size={ 24 } color={ 'white' } style={ styles.btnReload }/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { loading, data } = useRequest(getUrlBestStories(), false, flagRequest);

  useEffect(() => {
    if (!loading && Array.isArray(data)) dispatch(setList(data));
  }, [loading]);

  return (
    <View style={ styles.container }>
      <ActivityIndicator size={ 'large' } animating={ loading }/>
      { Array.isArray(state.bestStories) && state.bestStories.length > 0 &&
      <StoryList data={ state.bestStories } page={ state.page } chunkSize={ state.chunkSize }
                 setListLoading={ setListLoading }/>
      }
      <BottomBar page={ state.page } isLastPage={ state.islastPage } dispatchPageChange={ dispatch }
                 isLoading={ listLoading }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  opacityLoading: {
    backgroundColor: '#2222228a',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  btnReload: {
    padding: 10,
  },
});

export {
  StoryContainer,
}