import React, { useEffect, useReducer, useState } from 'react';
import { Text } from 'react-native';
import { getUrlItem } from '../utils/api';
import { slice } from 'ramda';
import { useRequest } from '../hooks';
import { handleListReducer, pushDisplayed, updateDisplayed } from '../reducers/storyList.reducer';

const StoryList = ({ data, page, chunkSize }) => {
  const [state, dispatch] = useReducer(handleListReducer, handleListReducer());

  const [urls, setUrls] = useState([]);

  const [urls, setUrls] = useState([]);

  const {loading, error, data: dataItems} = useRequest(urls, true);

  useEffect(() => {
    const listDataUrl = slice(page * chunkSize, page * chunkSize + chunkSize, data).map(
      (id) => getUrlItem(id)
    );

    setUrls(listDataUrl);
  }, [data, page]);

  useEffect(() => {
    if(!loading) console.log(loading, error, dataItems)
  }, [loading]);

  return (
    <Text></Text>
  )
};

export {
  StoryList,
}