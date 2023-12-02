/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

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

export { getGamers };
