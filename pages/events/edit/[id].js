// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import EventForm from '../../../components/event/EventForm';
// import { getSingleEvent } from '../../../utils/data/eventData';

// export default function EditEvent() {
//   const [editEvent, setEditEvent] = useState({});
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     getSingleEvent(id).then(setEditEvent);
//   }, [id]);

//   return (
//     <div>
//       <h2>Edit Event</h2>
//       <EventForm obj={editEvent} />
//     </div>
//   );
// }

// alternate code:
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleEvent } from '../../../utils/data/eventData';
// import EventForm from '../../../components/event/EventForm';

// export default function EditEvent() {
//   const [editEvent, setEditEvent] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   useEffect(() => {
//     getSingleEvent(id).then(setEditEvent);
//   }, [id]);

//   return (
//     <>
//       <EventForm eventObj={editEvent} />
//     </>
//   );
// }

// alternate code 2:
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);

  return (
    <>
      <EventForm eventObj={editEvent} />
    </>
  );
}
