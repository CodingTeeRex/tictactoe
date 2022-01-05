import { useState, useEffect } from 'react';
import { GamePieces } from '../shared/GamePieces';
import { SelectGamePiece }  from './SelectGamePiece';
import { GameBoard } from './GameBoard';
import { Image } from 'react-bootstrap';

const PlayAgainstAI = () => {
    
    const [Player, setPlayer] = useState(null);
    const [AI, setAI] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(''));
    const [gameState, setGameState] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState("Player");
    const [winner, setWinner] = useState(null);
    const [toggleModal, setToggleModal] = useState(true);
    const [gamePieceSelected, setGamePieceSelected] = useState(false);

    useEffect(() => {
        if (!toggleModal && winner === null) {
            if (randStartingPlayer() == 0) {
                setTurn("Player");
                alert("Player goes first");
                console.log(turn);
            } else {
                setTurn("AI");
                alert("AI goes first");
                console.log(turn);
            }
            console.log(turn, gamePieceSelected, AI, winner);
        }

    }, [winner, toggleModal]);

    useEffect(() => {
        console.log(AI);
        console.log(turn, gamePieceSelected, AI, winner);
        if (turn === "AI" && gamePieceSelected && AI !== null && winner === null) {
            let updateBoard = [...board];
            let updateGameState = [...gameState];
            setTimeout(() => {
                let move = bestMove(updateGameState)
                updateGameState[move] = AI.Player;
                updateBoard[move] = insertCellItem(AI.GamePiece);
                setGameState(updateGameState);
                setBoard(updateBoard);
                checkWinner(updateGameState, "AI");
                checkWinner(updateGameState, "Player");
                setTurn("Player");
            }, 500);
        }
    }, [turn, gamePieceSelected]);

    const toggleModalClose = () => {
        setToggleModal(!toggleModal);
    }

    const randStartingPlayer = () => {
        return Math.floor(Math.random() * 2);
    }

    const handleSubmit = (e) => {
        if (e.target.radioGamePiece.value === "pikachu") {
            const p = {Player: "Player", GamePiece: GamePieces.Pikachu}
            const ai = {Player: "AI", GamePiece: GamePieces.Snorlax};
            setPlayer(p);
            setAI(ai);
        } else {
            const p = {Player: "Player", GamePiece: GamePieces.Snorlax}
            const ai = {Player: "AI", GamePiece: GamePieces.Pikachu};
            setPlayer(p);
            setAI(ai);
        }
        setGamePieceSelected(true);
        toggleModalClose();
        e.preventDefault();
    }

    const handleRestart = () => {
        setWinner(null);
        setBoard(Array(9).fill(''));
        setGameState(Array(9).fill(''));
        toggleModalClose();
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
        }

        if (turn === "Player") {
            updateGameState[cellId] = Player.Player;
            updateBoard[cellId] = insertCellItem(Player.GamePiece);
            checkWinner(updateGameState, "Player");
            checkWinner(updateGameState, "AI");
            setTurn("AI");
        }

        setGameState(updateGameState);
        setBoard(updateBoard);
    }

    const isBoardFull = (board) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                return false;
            }
        }
        return true;
    }

    const checkWinner = (board, turn) => {
        if (isWinner(board, turn)) {
            if (turn === "Player") {
                setWinner("Player");
            } else if (turn === "AI") {
                setWinner("AI");
            }
        } else if (isBoardFull(board)) {
            setWinner("tie");
        }
    }

    const isWinner = (board, turn) => {

        return (
            equalsThree(board[0], board[1], board[2], turn) ||
            equalsThree(board[3], board[4], board[5], turn) ||
            equalsThree(board[6], board[7], board[8], turn) ||
            equalsThree(board[0], board[3], board[6], turn) ||
            equalsThree(board[1], board[4], board[7], turn) ||
            equalsThree(board[2], board[5], board[8], turn) ||
            equalsThree(board[0], board[4], board[8], turn) ||
            equalsThree(board[2], board[4], board[6], turn)
        );
    }

    const equalsThree = (a, b, c, player) => {
        if (a === b && b === c && a !== '' && a === player)
            return true;
        return false;
    }

    const bestMove = (board) => {
        let bestScore = -Infinity;
        let bestMove = null;
        let score = null;
        let boardCopy = [...board];

        for (let i = 0; i < boardCopy.length; i++) {
            if (boardCopy[i] === '') {
                boardCopy[i] = AI.Player;
                score = minimax(boardCopy, 0, false);
                boardCopy[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        setTurn("Player");
        return bestMove;
    }

    const minimax = (board, depth, isMaximising) => {
        if (isWinner(board, Player.Player)) {
            return -1;
        } else if (isWinner(board, AI.Player)) {
            return 1;
        } else if (isBoardFull(board)) {
            return 0;
        }

        if (isMaximising) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = AI.Player;
                    let score = minimax(board, depth+1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = Player.Player;
                    let score = minimax(board, depth+1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }


    return (
        <>
            <SelectGamePiece show={toggleModal} handleClose={toggleModalClose} handleSubmit={handleSubmit} />
            <GameBoard board={board} handleRestart={handleRestart} handleClick={handleClick} turn={turn} winner={winner} />
        </>
    )
}

export default PlayAgainstAI;
