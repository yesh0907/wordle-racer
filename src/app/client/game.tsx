"use client";

import { createContext, useState } from "react";
import Grid from "./grid";
import Keypad from "./keypad";

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
}

export const initGameState: IGameState = {
    GRID_SIZE,
    WORD_SIZE,
    grid: genEmptyGridState(GRID_SIZE, WORD_SIZE),
    updateGrid: () => {},
    currGuess: 0,
};

export const GameContext = createContext(initGameState);

export default function Game() {
    const [grid, setGrid] = useState(initGameState.grid);
    const updateGrid = (rowIdx: number, newRow: GridCell[]) => {
        const newGrid = grid;
        newGrid[rowIdx] = newRow;
        setGrid(newGrid);
    }
    // game max width: 500px, height of header is 40px
    return (
        <GameContext.Provider value={{...initGameState, grid, updateGrid}}>
            <div className="w-full max-w-[500px] my-0 mx-auto h-[calc(100%-40px)] flex flex-col">
                <Grid />
                <Keypad />
            </div>
        </GameContext.Provider>
    )
}