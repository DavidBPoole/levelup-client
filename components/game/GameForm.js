// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import {
//   createGame, getGameTypes,
// } from '../../utils/data/gameData';

// const initialState = {
//   skillLevel: 1,
//   numberOfPlayers: 0,
//   title: '',
//   maker: '',
//   gameType: 0,
// };

// const GameForm = ({ user }) => {
//   const [gameTypes, setGameTypes] = useState([]);
//   /*
//   Since the input fields are bound to the values of
//   the properties of this state variable, you need to
//   provide some default values.
//   */
//   const [currentGame, setCurrentGame] = useState(initialState);
//   const router = useRouter();

//   useEffect(() => {
//     getGameTypes().then(setGameTypes);
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentGame((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     // Prevent form from being submitted
//     e.preventDefault();

//     const game = {
//       maker: currentGame.maker,
//       title: currentGame.title,
//       numberOfPlayers: Number(currentGame.numberOfPlayers),
//       skillLevel: Number(currentGame.skillLevel),
//       gameType: Number(currentGame.gameType),
//       gamer: user.uid,
//     };

//     // Send POST request to your API
//     createGame(game).then(() => router.push('/games'));
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Title</Form.Label>
//           <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Maker</Form.Label>
//           <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Number of Players</Form.Label>
//           <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Skill Level</Form.Label>
//           <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
//         </Form.Group>

//         <FloatingLabel controlId="floatingSelect" label="GameType">
//           <Form.Select
//             aria-label="Game Type"
//             name="gameType"
//             onChange={handleChange}
//             className="mb-3"
//             value={currentGame.gameType}
//             required
//           >
//             <option value="">Select a Game Type</option>
//             {
//             gameTypes.map((type) => (
//               <option
//                 key={type.id}
//                 value={type.id}
//               >
//                 {type.label}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// GameForm.propTypes = {
//   obj: PropTypes.shape({
//     id: PropTypes.number,
//     maker: PropTypes.string,
//     title: PropTypes.string,
//     numberOfPlayers: PropTypes.number,
//     skillLevel: PropTypes.number,
//     gameType: PropTypes.number,
//   }),
// };

// GameForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//   }).isRequired,
// };

// GameForm.defaultProps = {
//   obj: initialState,
// };

// export default GameForm;

// alternate code:
// import PropTypes from 'prop-types';
// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { deleteGame } from '../../utils/data/gameData';

// function GameCard({ gameObj, onUpdate }) {
//   const router = useRouter();

//   const deleteThisGame = () => {
//     if (window.confirm('Delete this game?')) {
//       deleteGame(gameObj.id).then(() => onUpdate());
//     }
//   };

//   return (
//     <>
//       <Card className="text-center">
//         <Card.Header>{gameObj.title}</Card.Header>
//         <Card.Body>
//           <Card.Title>By: {gameObj.maker}</Card.Title>
//           <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
//           <Card.Text>Type: {gameObj.game_type.label}</Card.Text>
//         </Card.Body>
//         <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
//         <Button
//           onClick={() => {
//             router.push(`/games/edit/${gameObj.id}`);
//           }}
//         >Edit
//         </Button>
//         <Button
//           onClick={deleteThisGame}
//         >
//           Delete
//         </Button>
//       </Card>
//     </>
//   );
// }

// GameCard.propTypes = {
//   gameObj: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     maker: PropTypes.string.isRequired,
//     number_of_players: PropTypes.number.isRequired,
//     skill_level: PropTypes.number.isRequired,
//     game_type: PropTypes.shape({
//       label: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default GameCard;

// alternate code 2:
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (gameObj.id) {
      setCurrentGame({
        id: gameObj.id,
        maker: gameObj.maker,
        title: gameObj.title,
        numberOfPlayers: gameObj.number_of_players,
        skillLevel: gameObj.skill_level,
        gameType: gameObj.game_type?.id,
        userId: user.uid,
      });
    }
  }, [gameObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (gameObj.id) {
      const update = {
        id: gameObj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      updateGame(update, user.uid).then(() => router.push(`/games/${gameObj.id}`));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };
      createGame(game, user.uid).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="gameTypeId"
            required
            value={currentGame.gameTypeId}
            onChange={handleChange}
          >
            <option value="">Select a game type</option>
            {Array.isArray(gameTypes)
              && gameTypes.map((gameType) => (
                <option key={gameType.id} value={gameType.id}>
                  {gameType.label}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> {gameObj.id ? 'Update' : 'Create'} Game </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    maker: PropTypes.string,
    title: PropTypes.string,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
