// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import { createEvent, getSingleEvent, updateEvent } from '../../utils/data/eventData';
// import { getGames } from '../../utils/data/gameData';
// import { useAuth } from '../../utils/context/authContext';

// const initialState = {
//   description: '',
//   date: '',
//   time: '',
//   game: 0,
// };

// const EventForm = ({ obj }) => {
//   const [games, setGames] = useState([]);
//   const [currentEvent, setCurrentEvent] = useState(initialState);
//   const router = useRouter();
//   const { id } = router.query;
//   const { user } = useAuth();

//   useEffect(() => {
//     getGames().then(setGames);

//     if (obj.id) {
//       getSingleEvent(id).then((eventObj) => {
//         setCurrentEvent((prevState) => ({
//           ...prevState,
//           id: eventObj.id,
//           description: eventObj.description,
//           date: eventObj.date,
//           time: eventObj.time,
//           game: eventObj.game.id,
//         }));
//         console.warn(obj);
//       });
//     }
//   }, [obj, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentEvent((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     // Prevent form from being submitted
//     e.preventDefault();

//     if (currentEvent.id) {
//       const event = {
//         id: currentEvent.id,
//         description: currentEvent.description,
//         date: currentEvent.date,
//         time: currentEvent.time,
//         game: Number(currentEvent.game),
//       };
//       updateEvent(event).then(() => router.push('/events'));
//     } else {
//       const event = {
//         description: currentEvent.description,
//         date: currentEvent.date,
//         time: currentEvent.time,
//         game: Number(currentEvent.game),
//         organizer: user.uid,
//       };
//       createEvent(event, user.uid).then(() => router.push('/events'));
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Date</Form.Label>
//           <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Time</Form.Label>
//           <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
//         </Form.Group>

//         <FloatingLabel controlId="floatingSelect" label="Game">
//           <Form.Select
//             aria-label="Game"
//             name="game"
//             onChange={handleChange}
//             className="mb-3"
//             value={currentEvent.game}
//             required
//           >
//             <option value="">Select a Game</option>
//             {
//             games.map((game) => (
//               <option
//                 key={game.id}
//                 value={game.id}
//               >
//                 {game.title}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// EventForm.propTypes = {
//   obj: PropTypes.shape({
//     id: PropTypes.number,
//     date: PropTypes.string,
//     time: PropTypes.string,
//     // eslint-disable-next-line react/forbid-prop-types
//     game: PropTypes.number,
//   }),
// };

// EventForm.defaultProps = {
//   obj: initialState,
// };

// export default EventForm;

// alternate code:
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { createEvent, updateEvent } from '../../utils/data/eventData';
// import { getGames } from '../../utils/data/gameData';
// import { getGamers } from '../../utils/data/gamerData';
// import { useAuth } from '../../utils/context/authContext';

// const initialState = {
//   description: '',
//   date: '',
//   time: '',
//   gameId: 0,
//   userId: '',
// };

// function EventForm({ eventObj }) {
//   const [games, setGames] = useState([]);
//   const [organizers, setOrganizers] = useState([]);
//   const [currentEvent, setCurrentEvent] = useState(initialState);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getGames().then(setGames);
//     getGamers().then(setOrganizers);

//     if (eventObj.id) {
//       setCurrentEvent({
//         id: eventObj.id,
//         description: eventObj.description,
//         date: eventObj.date,
//         time: eventObj.time,
//         gameId: eventObj.game.id,
//         userId: eventObj.organizer.uid,
//       });
//     }
//   }, [eventObj, organizers]);

//   // console.warn(currentEvent);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentEvent((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (eventObj.id) {
//       const updatedEvent = {
//         id: eventObj.id,
//         description: currentEvent.description,
//         date: currentEvent.date,
//         time: currentEvent.time,
//         gameId: currentEvent.gameId,
//         userId: currentEvent.userId,
//       };

//       updateEvent(updatedEvent, user.uid).then(() => router.push(`/events/${eventObj.id}`));
//     } else {
//       const event = {
//         description: currentEvent.description,
//         date: currentEvent.date,
//         time: currentEvent.time,
//         gameId: currentEvent.gameId,
//         userId: currentEvent.userId,
//       };

//       console.warn(event);

//       createEvent(event, user.uid).then(() => router.push('/events'));
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Game</Form.Label>
//           <Form.Select name="gameId" required value={currentEvent.gameId} onChange={handleChange}>
//             <option value="">Select game:</option>
//             {
//                 games.map((game) => (
//                   <option
//                     key={game.id}
//                     value={game.id}
//                   >
//                     {game.title}
//                   </option>
//                 ))
//               }
//           </Form.Select>

//           <Form.Label>Event Description</Form.Label>
//           <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />

//           <Form.Label>Date (YYYY-MM-DD)</Form.Label>
//           <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />

//           <Form.Label>Time (HH:MM::SS)</Form.Label>
//           <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />

//           <Form.Label>Organizer</Form.Label>
//           <Form.Select name="userId" required value={currentEvent.userId} onChange={handleChange}>
//             <option value="">Select organizer:</option>
//             {
//             organizers.map((organizer) => (
//               <option
//                 key={organizer.uid}
//                 value={organizer.uid}
//               >
//                 {organizer.bio}
//               </option>
//             ))
//           }
//           </Form.Select>

//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// }

// EventForm.propTypes = {
//   eventObj: PropTypes.shape({
//     id: PropTypes.number,
//     description: PropTypes.string,
//     date: PropTypes.string,
//     time: PropTypes.string,
//     game: PropTypes.shape({
//       id: PropTypes.number,
//       title: PropTypes.string,
//     }),
//     organizer: PropTypes.shape({
//       id: PropTypes.number,
//       uid: PropTypes.string,
//       bio: PropTypes.string,
//     }),
//   }),
// };

// EventForm.defaultProps = {
//   eventObj: initialState,
// };

// export default EventForm;

// alternate code 2:
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  userId: '',
};

const EventForm = ({ eventObj }) => {
  const [game, setGame] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGame);

    if (eventObj.id) {
      setCurrentEvent({
        id: eventObj.id,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        game: eventObj.game?.id,
        organizer: user.uid,
      });
    }
  }, [eventObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (eventObj.id) {
      const update = {
        id: eventObj.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.gameId),
        organizer: user.uid,
      };
      updateEvent(update, user.uid).then(() => router.push(`/events/${eventObj.id}`));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.gameId),
        organizer: user.uid,
      };
      createEvent(event, user.uid).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control name="description" placeholder="Enter Event Name Here" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Date</Form.Label>
          <Form.Control name="date" placeholder="ex. 2023-11-17" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Time</Form.Label>
          <Form.Control name="time" placeholder="ex. 12:00" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Game</Form.Label>
          <Form.Select
            name="gameId"
            required
            value={currentEvent.gameId}
            onChange={handleChange}
          >
            <option value="">Select a game</option>
            {Array.isArray(game)
              && game.map((selectedGame) => (
                <option key={selectedGame.id} value={selectedGame.id}>
                  {selectedGame.title}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> {eventObj.id ? 'Update' : 'Create'} Event </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
