import React from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import { getUrlBestStories } from '../utils/api';
import { useRequest } from '../hooks';
import { StoryList } from '../components'

const StoryContainer = ({ navigation }) => {

  // Who should handle error ?
  const { loading, error, data } = useRequest(getUrlBestStories());

  return (
    <View>
      <ActivityIndicator size={ 'large' } animating={ loading }/>
      <StoryList data={data} />
    </View>
  )
};

export {
  StoryContainer,
}