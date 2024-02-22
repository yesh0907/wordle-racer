"use client";
import { useState } from "react";

import Grid from "./grid";
import Keypad from "./keypad";
import GameOver from "./game-over";
import { GameContext, initGameState } from "@/game/state";
import { GridCell, GRID_STATE, GRID_SIZE } from "@/game/constants";

interface GameProps {
    gameId: string;
    word: string;
    playerId: string;
}

export default function Game({ gameId, word, playerId }: GameProps) {
    const [grid, setGrid] = useState(initGameState.grid);
    const [currGuess, setCurrGuess] = useState(0);
    const [didWin, setDidWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const updateGrid = (rowIdx: number, newRow: GridCell[]) => {
        const newGrid = [...grid];
        newGrid[rowIdx] = newRow;
        setGrid(newGrid);
    }

    const checkWinLoseState = (guessState: GridCell[]) => {
        if (guessState.every(({ state }) => state === GRID_STATE.CORRECT_IN_RIGHT_PLACE)) {
            setDidWin(true);
            setGameOver(true);
        } else if (currGuess === GRID_SIZE - 1) {
            setGameOver(true);
        }
    }

    const checkGuess = (guess: string) => {
        const newRow = grid[currGuess];
        const used: Set<number> = new Set();

        // look for all greens and mark the rest incorrect letters for now
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === word[i]) {
                newRow[i].state = GRID_STATE.CORRECT_IN_RIGHT_PLACE;
                used.add(i);
            } else {
                newRow[i].state = GRID_STATE.INCORRECT;
            }
        }

        // look for all yellows letters
        for (let i = 0; i < guess.length; i++) {
            if (word.includes(guess[i])) {
                const yellowIdx = word.indexOf(guess[i]);
                if (!used.has(yellowIdx) && newRow[yellowIdx].state !== GRID_STATE.CORRECT_IN_RIGHT_PLACE) {
                    newRow[i].state = GRID_STATE.CORRECT_IN_WRONG_PLACE;
                    used.add(yellowIdx);
                }
            }
        }

        // check win or lose state
        checkWinLoseState(newRow);

        // update state
        updateGrid(currGuess, newRow);
        setCurrGuess((prev) => prev + 1);
    }

    console.log(playerId);

    // game max width: 500px, height of header is 40px
    return (
        <GameContext.Provider value={{
            ...initGameState, grid, updateGrid, checkGuess,
            currGuess, word, gameId, playerId,
        }}>
            <div className="w-full max-w-[500px] my-0 mx-auto h-[calc(100%-40px)] flex flex-col">
                <Grid />
                <Keypad />
                {gameOver && <GameOver didWin={didWin} />}
            </div>
        </GameContext.Provider>
    )
}