"use client";

import { createContext } from "react";
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

export const initGameState = {
    GRID_SIZE,
    WORD_SIZE,
    grid: genEmptyGridState(GRID_SIZE, WORD_SIZE),
};

export const GameContext = createContext(initGameState);

export default function Game() {
    return (
        <GameContext.Provider value={initGameState}>
            <div className="flex flex-col w-full items-center min-w-0 gap-6">
                <Grid />
                <Keypad />
            </div>
        </GameContext.Provider>
    )
}