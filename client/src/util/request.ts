const buildURL = ({ url, query }: { url: string; query?: QUERY[] }) => {
  let URL = `${process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api'}/${url}`;
  if (query) {
    URL = `${URL}?${query.map(({ key, value }) => `${key}=${value}`).join('&')}`;
  }

  return URL;
};

export const request = async ({ method, url, body, query }: REQUEST) => {
  const requestURL = buildURL({ url, query });
  const options = {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(requestURL, options);
  return response.json();
};
