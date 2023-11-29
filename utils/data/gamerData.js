import { clientCredentials } from '../client';
// Requires gamer card and page to be setup before calling function:

const getGamers = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getGamers };
