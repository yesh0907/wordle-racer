"use client";

import { useQuery } from "@tanstack/react-query";
import Grid from "./grid";
import Keypad from "./keypad";
import { createContext, useEffect, useState } from "react";
import GameOver from "./game-over";

const GRID_SIZE = 6;
const WORD_SIZE = 5;

export enum GRID_STATE {
    EMPTY,
    INCORRECT,
    CORRECT_IN_WRONG_PLACE,
    CORRECT_IN_RIGHT_PLACE,
};

export type GridCell = {
    value: string;
    state: GRID_STATE;
};

const genEmptyGridState = (gridSize: number, wordSize: number) => {
    const grid: GridCell[][] = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < wordSize; j++) {
            grid[i][j] = {
                value: "",
                state: GRID_STATE.EMPTY
            };
        }
    }
    return grid;
}

interface IGameState {
    GRID_SIZE: number,
    WORD_SIZE: number,
    grid: GridCell[][],
    updateGrid: (rowIdx: number, newRow: GridCell[]) => void,
    currGuess: number,
    word: string,
    checkGuess: (guess: string) => void,
}

export const initGameState: IGameState = {
    GRID_SIZE,
    WORD_SIZE,
    grid: genEmptyGridState(GRID_SIZE, WORD_SIZE),
    updateGrid: () => { },
    currGuess: 0,
    word: '',
    checkGuess: () => { },
};

export const GameContext = createContext(initGameState);

export default function Game() {
    const [word, setWord] = useState('');
    const [grid, setGrid] = useState(initGameState.grid);
    const [currGuess, setCurrGuess] = useState(0);
    const [didWin, setDidWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // load word
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['word'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${WORD_SIZE}`, {
                    mode: 'cors',
                });
                if (res.ok) {
                    const data: string[] = await res.json();
                    return data[0].toUpperCase() ?? '';
                }

                throw new Error('request failed');
            } catch (e) {
                throw new Error(`fetch word: ${e}`);
            }
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!isLoading && data) {
            setWord(data);
            console.log(`word: ${data}`);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (isError) {
            console.error(error);
        }
    }, [isError, error]);
    
    const updateGrid = (rowIdx: number, newRow: GridCell[]) => {
        const newGrid = [...grid];
        newGrid[rowIdx] = newRow;
        setGrid(newGrid);
    }

    const checkWinLoseState = (guessState: GridCell[]) => {
        if (guessState.every(({ state }) => state === GRID_STATE.CORRECT_IN_RIGHT_PLACE)) {
            console.log('win');
            setDidWin(true);
            setGameOver(true);
        } else if (currGuess === GRID_SIZE-1) {
            setGameOver(true);
        }
    }

    const checkGuess = (guess: string) => {
        const newRow = grid[currGuess];
        const used: Set<number> = new Set();

        // look for all greens
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === word[i]) {
                newRow[i].state = GRID_STATE.CORRECT_IN_RIGHT_PLACE;
                used.add(i);
            }
        }

        // look for all yellows and incorrect letters
        for (let i = 0; i < guess.length; i++) {
            if (word.includes(guess[i])) {
                const yellowIdx = word.indexOf(guess[i]);
                if (!used.has(yellowIdx) && newRow[yellowIdx].state !== GRID_STATE.CORRECT_IN_RIGHT_PLACE) {
                    newRow[i].state = GRID_STATE.CORRECT_IN_WRONG_PLACE;
                    used.add(yellowIdx);
                }
            } else {
                newRow[i].state = GRID_STATE.INCORRECT;
            }
        }

        // check win or lose state
        checkWinLoseState(newRow);

        // update state
        updateGrid(currGuess, newRow);
        setCurrGuess((prev) => prev + 1);
    }

    // game max width: 500px, height of header is 40px
    return (
        <GameContext.Provider value={{
            ...initGameState, grid, updateGrid, checkGuess,
            currGuess, word,
        }}>
            <div className="w-full max-w-[500px] my-0 mx-auto h-[calc(100%-40px)] flex flex-col">
                <Grid />
                <Keypad />
                {gameOver && <GameOver didWin={didWin} />}
            </div>
        </GameContext.Provider>
    )
}