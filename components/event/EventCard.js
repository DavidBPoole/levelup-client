import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ eventObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisEvent = () => {
    if (window.confirm('Delete this game?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

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
        <Card.Header style={{ fontSize: 20 }}><b>{eventObj.description}</b></Card.Header>
        <Card.Body>
          <Card.Title>Organizer: {eventObj.organizer.bio}</Card.Title>
          <Card.Title>Date: {eventObj.date}</Card.Title>
          <Card.Title>Time: {eventObj.time}</Card.Title>
          <Card.Text><b>Game: {eventObj.game.title}</b></Card.Text>
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

  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
