/* eslint-disable no-nested-ternary */
import { queryCache } from 'react-query';
import { logout } from 'utils/auth';

// const isNotNullNorUndefined = (value) => typeof value !== "undefined" && (typeof value !== "object" || !value);

async function client(endpoint, { data, method, headers, params, ...customConfig } = {}) {
  // const apiURL = process.env.REACT_APP_API_URL;
  const apiURL = process.env.REACT_APP_API_URL;

  // if(!isNotNullNorUndefined(apiURL)){
  //   throw new Error('API URL not specified!!!');
  // }
  const token = localStorage.getItem('token');

  const config = {
    method: !!method ? method : data ? 'POST' : 'GET',
    body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
    },
    ...customConfig,
  };

  if (data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const url = new URL(`${apiURL}/${endpoint}`);
  url.search = new URLSearchParams(params).toString();

  return window.fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      if (endpoint !== 'auth/login/') {
        queryCache.clear();
        logout();
      }
    }
    if (response.status === 204) {
      return 'No content';
    }
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
    return Promise.reject(responseData);
  });
}

export { client };
