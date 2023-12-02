// import EventForm from '../../components/event/EventForm';
// import { useAuth } from '../../utils/context/authContext';

// const NewEvent = () => {
//   const { user } = useAuth();
//   return (
//     <div>
//       <h2>Register New Event</h2>
//       <EventForm user={user} />
//     </div>
//   );
// };

// export default NewEvent;

// alternate code:
// import EventForm from '../../components/event/EventForm';

// const NewEvent = () => (
//   <div>
//     <h2>Add New Event</h2>
//     <EventForm />
//   </div>
// );

// export default NewEvent;

// alternate code 2:
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Event</h2>
      <EventForm user={user} />
    </div>
  );
};

export default NewEvent;
