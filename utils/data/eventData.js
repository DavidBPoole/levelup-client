import { clientCredentials } from '../client';

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
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

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const createEvent = (event, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/events`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//     body: JSON.stringify(event),
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// alternate code createEvent code 2:
const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
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

// const updateEvent = (event) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(event),
//   })
//     // .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// alternate updateEvent code 2:\
const updateEvent = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${payload.id}`, {
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

// const deleteEvent = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/events/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((data) => resolve((data)))
//     .catch(reject);
// });

// alternate deleteEvent code 2:
const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('NETWORK RESPONSE NOT OK');
      }
      resolve();
    })
    .catch(reject);
});

// const joinEvent = (eventId, uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${uid}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// alternate joinEvent code 2:
const joinEvent = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify({ userId: uid }),
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// incomplete leaveEvent code:
// const leaveEvent = (eventId, uid) => fetch(`http://localhost:8000/events/${eventId}/leave`, {
//   method: 'DELETE',
//   headers: {
//     Authorization: `${uid}`,
//   },
// });

// alternate leaveEvent code 2:
const leaveEvent = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify({ userId: uid }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
// export {
//   getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent, joinEvent, leaveEvent,
// };

// alternate export code 2:
export {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};
