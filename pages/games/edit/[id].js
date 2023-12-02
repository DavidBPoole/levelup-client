// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import GameForm from '../../../components/game/GameForm';
// import { getSingleGame } from '../../../utils/data/gameData';

// export default function EditGame() {
//   const [editGame, setEditGame] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   useEffect(() => {
//     getSingleGame(id).then(setEditGame);
//   }, [id]);

//   return (
//     <div>
//       <h2>Edit Game</h2>
//       <GameForm obj={editGame} />
//     </div>
//   );
// }

// alternate code:
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleGame } from '../../../utils/data/gameData';
// import GameForm from '../../../components/game/GameForm';

// export default function EditGame() {
//   const [editGame, setEditGame] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   useEffect(() => {
//     getSingleGame(id).then(setEditGame);
//   }, [id]);

//   return (
//     <>
//       <GameForm gameObj={editGame} />
//     </>
//   );
// }

// alternate code 2:
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <>
      <GameForm gameObj={editGame} />
    </>
  );
}
