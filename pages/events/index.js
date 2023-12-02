/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { getEvents } from '../utils/data/eventData';
// import EventCard from '../components/event/EventCard';
// import { useAuth } from '../utils/context/authContext';

// function Events() {
//   const [events, setEvents] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   const getAllEvents = () => {
//     getEvents(user.uid).then((data) => setEvents(data));
//   };

//   useEffect(() => {
//     getAllEvents();
//   }, []);

//   return (
//     <>
//       <article className="events">
//         <h1>Events</h1>
//         <Button
//           onClick={() => {
//             router.push('/events/new');
//           }}
//         >
//           Register New Event
//         </Button>
//         {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//           .map((event) => (
//             <section key={`event--${event.id}`} className="event">
//               <EventCard id={event.id} description={event.description} time={event.time} date={event.date} game={event.game} onUpdate={getAllEvents} joined={event.joined} />
//             </section>
//           ))}
//       </article>
//     </>
//   );
// }

// export default Events;

// alternate code:
// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import EventCard from '../../components/event/EventCard';
// import { getEvents } from '../../utils/data/eventData';
// import { useAuth } from '../../utils/context/authContext';

// function EventsHome() {
//   const [events, setEvents] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   const getAllEvents = () => {
//     getEvents(user.uid).then((data) => setEvents(data));
//   };

//   useEffect(() => {
//     getAllEvents();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   return (
//     <article className="events">
//       <h1>Events</h1>
//       <Button
//         onClick={() => {
//           router.push('/events/new');
//         }}
//       >Add New Event
//       </Button>
//       {events.map((event) => (
//         <section key={`event--${event.id}`} className="event">
//           <EventCard eventObj={event} onUpdate={getAllEvents} joined={event.joined} />
//         </section>
//       ))}
//     </article>
//   );
// }

// export default EventsHome;

// alternate code 2:
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >Create New Event
      </Button>
      <h1>List of Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} onUpdate={getAllEvents} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default Home;
