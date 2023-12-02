import { clientCredentials } from '../client';

// getGames to grab all games for specific logged in user:
// const getGames = (uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/games`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//   })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// Alternative IF/ELSE CREATE Game:
// const createGame = async (game, token) => {
//   try {
//     const response = await fetch(`${clientCredentials.databaseURL}/games`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//       body: JSON.stringify(game),
//     });

//     console.warn('Response status:', response.status);

//     if (response.status === 201) {
//       // Handle successful creation
//     } else {
//       // Handle other cases (e.g., log error details)
//     }
//   } catch (error) {
//     console.error('Error creating game:', error);
//   }
// };

// const createGame = (game, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/games`, {
//     method: 'POST',
//     body: JSON.stringify(game),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `${uid}`,
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Create Game Error:', error);
      reject(error);
    });
});

// const updateGame = (game, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/games/${game.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//     body: JSON.stringify(game),
//   })
//     // .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const updateGame = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// const deleteGame = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/games/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((data) => resolve((data)))
//     .catch(reject);
// });

const deleteGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

// const getGameTypes = () => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/gametypes`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.warn('Fetched game types:', data);
//       resolve(data);
//     })
//     .catch(reject);
// });

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getGames,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame,
  getGameTypes,
};
