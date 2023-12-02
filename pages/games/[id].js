/* eslint-disable react-hooks/exhaustive-deps */
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
      <b><h1>Game</h1></b>
      <b><p>Title: {singleGame.title}</p></b>
      <b><p>By: {singleGame.maker}</p></b>
      <b><p>Number of Players: {singleGame.number_of_players}</p></b>
      <b><p>Skill Level: {singleGame.skill_level}</p></b>
    </article>
  );
}

export default SingleGame;
