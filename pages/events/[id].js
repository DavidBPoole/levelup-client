import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../utils/data/eventData';

function SingleEvent() {
  const [singleEvent, setSingleEvent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then((data) => setSingleEvent(data));
  }, [id]);

  return (
    <article className="single-event">
      <b><h1>Event</h1></b>
      <b><p>Description: {singleEvent.description}</p></b>
      <b><p>Date: {singleEvent.date}</p></b>
      <b><p>Time: {singleEvent.time}</p></b>
      <b><p>Game: {singleEvent.game?.title}</p></b>
      <b><p>Organizer: {singleEvent.organizer?.bio}</p></b>
    </article>
  );
}

export default SingleEvent;
