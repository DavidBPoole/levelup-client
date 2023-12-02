// alternate code:
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleEvent } from '../../utils/data/eventData';

// export default function ViewEvent() {
//   const [eventDetails, setEventDetails] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   const getEventDetails = () => {
//     getSingleEvent(id).then(setEventDetails);
//   };

//   useEffect(() => {
//     getEventDetails();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   return (
//     <>
//       <h1>Date: {eventDetails.date}</h1>
//       <h2>Time: {eventDetails.time}</h2>
//       <h2>Game: {eventDetails.game?.title}</h2>
//       <h2>Organizer: {eventDetails.organizer?.bio}</h2>
//       <p>Description: {eventDetails.description}</p>
//     </>
//   );
// }

// alternate code 2:
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
      <h1>Event</h1>
      <p>Description: {singleEvent.description}</p>
      <p>Date: {singleEvent.date}</p>
      <p>Time: {singleEvent.time}</p>
      <p>Game: {singleEvent.game?.title}</p>
      <p>Organizer: {singleEvent.organizer?.bio}</p>
    </article>
  );
}

export default SingleEvent;
