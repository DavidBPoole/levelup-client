/* eslint-disable react-hooks/exhaustive-deps */
// alternate code:
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleGame } from '../../utils/data/gameData';

// export default function ViewGame() {
//   const [gameDetails, setGameDetails] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   const getGameDetails = () => {
//     getSingleGame(id).then(setGameDetails);
//   };

//   console.warn(gameDetails);

//   useEffect(() => {
//     getGameDetails();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   return (
//     <>
//       <h1>Game: {gameDetails.title}</h1>
//       <h2>Made by: {gameDetails.maker}</h2>
//       <h2>Number of Players: {gameDetails.number_of_players}</h2>
//       <h2>Skill Level: {gameDetails.skill_level}</h2>
//       <h2>GameType: {gameDetails.game_type?.label}</h2>
//     </>
//   );
// }

// alternate code 2:
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

function SingleGame() {
  const [singleGame, setSingleGame] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then((data) => setSingleGame(data));
  }, []);

  return (
    <article className="single-game">
      <h1>Game</h1>
      <p>Title: {singleGame.title}</p>
      <p>By: {singleGame.maker}</p>
      <p>Number of Players: {singleGame.number_of_players}</p>
      <p>Skill Level: {singleGame.skill_level}</p>
    </article>
  );
}

export default SingleGame;
