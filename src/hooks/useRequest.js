import React, { useEffect, useReducer } from 'react';

import { dataFetchReducer, fetchSuccess, fetchFailure, initFetch } from '../reducers/useResquest.reducer';

/**
 * useRequest: Hook to make GET request
 *
 * @param initUrl: url to fetch from (only work for GET)
 * @return {{isLoading: boolean, isError: boolean, data: (Object | Array | undefined )}}
 */
const useRequest = (initUrl) => {
  const [state, dispatch] = useReducer(dataFetchReducer, dataFetchReducer());

  useEffect(() => {
    // Prevent changing state when unmounted (might use setInterval later on, if not remove it)
    let _isMounted = true;

    const fetchData = async () => {
      try {
        dispatch(initFetch());

        const response = await fetch(initUrl);

        const responseData = await response.json();

        if (_isMounted) dispatch(fetchSuccess(responseData));
      } catch (err) {
        if (_isMounted) dispatch(fetchFailure());
      }
    };

    fetchData();

    return () => { _isMounted = false; }
  }, [initUrl]);

  return state;
};

export {
  useRequest,
}