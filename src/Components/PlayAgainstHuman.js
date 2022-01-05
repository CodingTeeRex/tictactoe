import { useState, useEffect } from 'react';
import { GamePieces } from '../shared/GamePieces';
import { SelectGamePiece }  from './SelectGamePiece';
import { GameBoard } from './GameBoard';
import { Image } from 'react-bootstrap';

const PlayAgainstHuman = () => {

    const [P1, setP1] = useState({Player: "Player 1", GamePiece: GamePieces.Pikachu});
    const [P2, setP2] = useState({Player: "Player 2", GamePiece: GamePieces.Snorlax});
    const [board, setBoard] = useState(Array(9).fill(''));
    const [gameState, setGameState] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState("Player 1");
    const [winner, setWinner] = useState(null);
    const [toggleModal, setToggleModal] = useState(true);

    const toggleModalClose = () => {
        setToggleModal(!toggleModal);
    }

    const handleSubmit = (e) => {
        if (e.target.radioGamePiece.value === "pikachu") {
            let p1 = P1;
            p1.GamePiece = GamePieces.Pikachu;
            let p2 = P2;
            p2.GamePiece = GamePieces.Snorlax;
            setP1(p1);
            setP2(p2);
        } else {
            let p1 = P1;
            p1.GamePiece = GamePieces.Snorlax;
            let p2 = P2;
            p2.GamePiece = GamePieces.Pikachu;
            setP1(p1);
            setP2(p2);
        }
        toggleModalClose();
        e.preventDefault();
    }

    const insertCellItem = (GamePiece) => {
        return (
            <Image fluid src={GamePiece.img} alt={GamePiece.name} id="game-piece" />
        );
    }

    const handleClick = (cellId) => {
        let updateBoard = [...board];
        let updateGameState = [...gameState];
        if (winner) {
            alert("Round has ended!");
            return;
        }

        if (updateBoard[cellId] !== '') {
            alert("This cell has already been chosen!");
            return;
        } else {
            switch(turn) {
                case "Player 1":
                    updateGameState[cellId] = P1.Player;
                    updateBoard[cellId] = insertCellItem(P1.GamePiece);
                    isWinner(updateGameState, P1.Player);
                    setTurn("Player 2");
                    break;
                case "Player 2":
                    updateGameState[cellId] = P2.Player;
                    updateBoard[cellId] = insertCellItem(P2.GamePiece);
                    isWinner(updateGameState, P2.Player);
                    setTurn("Player 1");
                    break;
                default:
                    break;
            }
        }

        setGameState(updateGameState);
        setBoard(updateBoard);
    }

    const handleRestart = () => {
        setWinner(null);
        setBoard(Array(9).fill(''));
        setGameState(Array(9).fill(''));
        setTurn("Player 1");
        toggleModalClose();
    }

    const anyAvailableCells = (gameState) => {
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                return true;
            }
        }
        return false;
    }

    const isWinner = (updateGameState) => {
        const winConditions = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let winCondition in winConditions) {
            winConditions[winCondition].forEach((condition) => {
                if (updateGameState[condition[0]] !== '' || updateGameState[condition[1]] !== '' || updateGameState[condition[2]] !== '') {
                    if (updateGameState[condition[0]] === updateGameState[condition[1]] && updateGameState[condition[1]] === updateGameState[condition[2]] && updateGameState[condition[2]]) {
                        setWinner(updateGameState[condition[0]]);
                        return;
                    } 
                    if (!anyAvailableCells(updateGameState) && winner === null) {
                        setWinner("tie");
                    }
                }
            })
        }
        return;
    }

    return (
        <>
            <SelectGamePiece show={toggleModal} handleClose={toggleModalClose} handleSubmit={handleSubmit} />
            <GameBoard board={board} handleRestart={handleRestart} handleClick={handleClick} turn={turn} winner={winner} />
        </>
    )
}

export default PlayAgainstHuman;
