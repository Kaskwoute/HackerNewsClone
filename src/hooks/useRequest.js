import React, { useEffect, useReducer, useRef } from 'react';
import { dataFetchReducer, fetchSuccess, fetchFailure, initFetch } from '../reducers/useResquest.reducer';

/**
 * useRequest: Hook to make GET request
 *
 * @param initUrl: url to fetch from (only work for GET)
 * @param cachable: boolean whether or not to cache this request
 * @param refreshFlag: used for the 30sc refresh
 * @return {{isLoading: boolean, isError: boolean, data: Array}}
 */
const useRequest = (initUrl, cachable = false, refreshFlag) => {
  const cache             = useRef({});
  const [state, dispatch] = useReducer(dataFetchReducer, dataFetchReducer());

  const checkCachedUrls = (urlArray) => urlArray.reduce(({ cached, toFetch }, url) => {
    if (cache.current[url]) cached = [...cached, cache.current[url]];
    else toFetch = [...toFetch, url];

    return {
      cached: cached,
      toFetch: toFetch,
    }

  }, {
    cached: [],
    toFetch: [],
  });

  useEffect(() => {
    if (!initUrl || (Array.isArray(initUrl) && initUrl.length === 0)) return;

    // Prevent changing state when unmounted (might use setInterval later on, if not remove it)
    let _isMounted = true;

    const fetchData = async () => {
      try {
        dispatch(initFetch());

        let responseData;

        if (Array.isArray(initUrl)) {

          const { cached, toFetch } = checkCachedUrls(initUrl);

           const data = await Promise.all(toFetch.map(
            async (url) => {
              const resp = await fetch(url);

              const data =  await resp.json();

              if(cachable) cache.current[url] = data;

              return data
            },
          ));

          responseData = [...data, ...cached]
        } else {

          if (cache.current[initUrl]) responseData = cache.current[initUrl];
          else {
            const response = await fetch(initUrl);

            responseData = await response.json();

            if (cachable) cache.current[initUrl] = responseData;
          }
        }

        if (_isMounted) dispatch(fetchSuccess(responseData));
      } catch (err) {
        if (_isMounted) dispatch(fetchFailure());
      }
    };

    fetchData();

    return () => { _isMounted = false; }
  }, [JSON.stringify(initUrl), refreshFlag]);

  return state;
};

export {
  useRequest,
}