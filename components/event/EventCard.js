/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
// import Link from 'next/link';
// import PropTypes from 'prop-types';
// import React from 'react';
// import { Button, Card } from 'react-bootstrap';
// import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
// import { useAuth } from '../../utils/context/authContext';

// const EventCard = ({
//   id,
//   description,
//   date,
//   time,
//   onUpdate,
//   joined,
// }) => {
//   const { user } = useAuth();

//   // Handle joined being undefined
//   const isJoined = joined !== undefined ? joined : 0;

//   const deleteThisEvent = () => {
//     if (window.confirm(`Delete ${description}?`)) {
//       deleteEvent(id).then(() => onUpdate());
//     }
//   };

//   const join = () => joinEvent(id, user.uid).then(() => onUpdate());
//   const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());

//   return (
//     <Card className="text-center">
//       <Card.Header>Event</Card.Header>
//       <Card.Body>
//         <Card.Title>{description}</Card.Title>
//         <Card.Text>Date: {date} Time: {time}</Card.Text>
//         <Link href={`/events/edit/${id}`} passHref>
//           <Button>Edit</Button>
//         </Link>
//         <Button variant="danger" onClick={deleteThisEvent} className="m-2">
//           Delete
//         </Button>
//         {isJoined
//           ? (
//             <Button variant="success" onClick={leave} className="m-2">
//               Leave
//             </Button>
//           )
//           : (
//             <Button variant="success" onClick={join} className="m-2">
//               Join
//             </Button>
//           )}
//       </Card.Body>
//     </Card>
//   );
// };

// EventCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   description: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   time: PropTypes.string.isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   joined: PropTypes.number,
// };

// EventCard.defaultProps = {
//   joined: 0,
// };

// export default EventCard;

// alternate code:
// import PropTypes from 'prop-types';
// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
// import { useAuth } from '../../utils/context/authContext';

// function EventCard({ eventObj, onUpdate }) {
//   const router = useRouter();
//   const { user } = useAuth();

//   const deleteThisEvent = () => {
//     if (window.confirm('Delete this event?')) {
//       deleteEvent(eventObj.id).then(() => onUpdate());
//     }
//   };

//   const join = () => {
//     joinEvent(eventObj.id, user.uid).then(() => onUpdate());
//   };

//   const leave = () => {
//     leaveEvent(eventObj.id, user.uid).then(() => onUpdate());
//   };

//   console.warn(eventObj);

//   return (
//     <>
//       <Card className="text-center">
//         <Card.Header>{eventObj.game.title}</Card.Header>
//         <Card.Body>
//           <Card.Title>Organized by: {eventObj.organizer.bio}</Card.Title>
//           <Card.Text>{eventObj.description}</Card.Text>
//         </Card.Body>
//         <Card.Footer className="text-muted">Date: {eventObj.date} Time: {eventObj.time}</Card.Footer>
//         <Button
//           onClick={() => {
//             router.push(`/events/edit/${eventObj.id}`);
//           }}
//         >Edit
//         </Button>
//         <Button
//           onClick={deleteThisEvent}
//         >
//           Delete
//         </Button>
//         {eventObj.joined ? (
//           <Button
//             onClick={leave}
//           >Leave
//           </Button>
//         )
//           : (
//             <Button
//               onClick={join}
//             >Join
//             </Button>
//           )}

//       </Card>
//     </>
//   );
// }

// EventCard.propTypes = {
//   eventObj: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     game: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//     }),
//     description: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired,
//     organizer: PropTypes.shape({
//       bio: PropTypes.string.isRequired,
//     }),
//     joined: PropTypes.bool.isRequired,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default EventCard;

// alternate code 2:
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ eventObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  // console.warn('Event Object:', eventObj);
  // console.warn('Joined Users:', eventObj.joined_users);

  const deleteThisEvent = () => {
    if (window.confirm('Delete this game?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  // const join = () => {
  //   joinEvent(eventObj.id, user.uid).then(() => onUpdate());
  // };

  const join = () => {
    joinEvent(eventObj.id, user.uid)
      .then(() => onUpdate())
      .catch((error) => console.error('Join Event Error:', error));
  };

  const leave = () => {
    leaveEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{eventObj.description}</Card.Header>
        <Card.Body>
          <Card.Title>By: {eventObj.organizer.bio}</Card.Title>
          <Card.Title>When: {eventObj.date} at {eventObj.time}</Card.Title>
          <Card.Text>Game: {eventObj.game.title}</Card.Text>
          {/* Added to display joined users - currently not working */}
          {/* {eventObj.joined_users && eventObj.joined_users.length > 0 && (
          <Card.Text>
            Joined Users: {eventObj.joined_users.map((joinedUser, index) => (
              <span key={index}>{joinedUser.gamer.uid}</span>
          ))}
          </Card.Text>
          )} */}
        </Card.Body>
        <Button
          onClick={() => {
            router.push(`/events/edit/${eventObj.id}`);
          }}
        >Edit
        </Button>
        <Button
          onClick={deleteThisEvent}
        >Delete
        </Button>
        {eventObj.joined ? (
          <Button
            onClick={leave}
          >Leave
          </Button>
        )
          : (
            <Button
              onClick={join}
            >Join
            </Button>
          )}
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      bio: PropTypes.string.isRequired,
    }),
    joined: PropTypes.bool.isRequired,
    // added to display joined users on DOM - currently not working:
    // joined_users: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
