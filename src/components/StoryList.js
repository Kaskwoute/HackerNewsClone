import React, { useEffect, useState } from 'react';
import { slice } from 'ramda';
import { FlatList } from 'react-native';

import { getUrlItem } from '../utils/api';
import { useRequest } from '../hooks';
import { Story } from './Story';

const StoryList = ({ data, page, chunkSize, setListLoading }) => {
  const [urls, setUrls] = useState([]);

  const [displayList, setDisplayList] = useState([]);

  const {loading, data: dataItems} = useRequest(urls, true);

  useEffect(() => {
    const listDataUrl = slice(page * chunkSize, page * chunkSize + chunkSize, data).map(
      (id) => getUrlItem(id)
    );

    setUrls(listDataUrl);
  }, [data, page]);


  useEffect(() => {
    setListLoading(loading);

    if(!loading) {
      setDisplayList(dataItems)
    }
  }, [loading]);

  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={Story}
    />
  )
};

export {
  StoryList,
}