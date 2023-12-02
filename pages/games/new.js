// import GameForm from '../../components/game/GameForm';
// import { useAuth } from '../../utils/context/authContext';

// const NewGame = () => {
//   const { user } = useAuth();
//   return (
//     <div>
//       <h2>Register New Game</h2>
//       <GameForm user={user} />
//     </div>
//   );
// };

// export default NewGame;

// alternate code:
// import GameForm from '../../components/game/GameForm';

// const NewGame = () => (
//   <div>
//     <h2>Register New Game</h2>
//     <GameForm />
//   </div>
// );

// export default NewGame;

// alternate code 2:
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';

const NewGame = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Game</h2>
      <GameForm user={user} />
    </div>
  );
};

export default NewGame;
