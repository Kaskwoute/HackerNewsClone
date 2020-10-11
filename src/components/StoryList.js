import React, {useEffect} from 'react';
import { Text } from 'react-native';
import { getUrlItem } from '../utils/api';
import { slice } from 'ramda';
import { useRequest } from '../hooks';

const StoryList = ({ data, page, chunkSize }) => {

  const test = slice(page * chunkSize, page * chunkSize + chunkSize, data);

  // we want to do it only after we filter ones that are not cached
  const { loading, error, data: test2 } = useRequest(getUrlItem(test[0]));

  // filter to check those that are cached

  // State might change if user click multiple time, check this
  useEffect(() => {
    if(!loading && test2) console.log(test2);
  }, [loading]);

  // CHeck if flatlist can render 20 and if only 10 are present show skeleton of 10 other

//  console.log(test2);
//
//
//  Promise.all(test.map(
//      async (id) => {
//        const resp = await fetch(getUrlItem(id));
//
//        return await resp.json();
//      },
//    )).then((a, b, c, d) => {
//    console.log(a, b, c, d)
//  });

  return (
    <Text></Text>
  )
};

export {
  StoryList,
}