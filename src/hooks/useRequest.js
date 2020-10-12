import React, { useEffect, useReducer, useRef } from 'react';
import { dataFetchReducer, fetchSuccess, fetchFailure, initFetch } from '../reducers/useResquest.reducer';

/**
 * @description:
 *
 * @param initUrl: url to fetch from (only work with GET)
 * @param cachable: boolean whether or not to cache this request
 * @param refreshFlag: Hack used to force useEffect refresh
 *
 * @return {{isLoading: boolean, isError: boolean, data: Array}}
 */
const useRequest = (initUrl, cachable = false, refreshFlag) => {
  const cache             = useRef({});
  const [state, dispatch] = useReducer(dataFetchReducer, dataFetchReducer());

  /**
   *
   * @description: Take an array of url and return url that where cached and those that needs to be fetched
   *
   * @param urlArray: Array of url
   *
   * @typedef {Object} CachedUrls
   * @property {Array} cached - url response that are cached
   * @property {Array} toFetch - url response that are not cached
   *
   * @return {(CachedUrls)}
   */
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
    // Do nothing if url is not correct, usually undefined or [] when component is mounted
    if (!initUrl || (Array.isArray(initUrl) && initUrl.length === 0)) return;

    // Prevent changing state when unmounted
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