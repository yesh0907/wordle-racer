import { createContext } from "react";
import { GridCell, GRID_SIZE, WORD_SIZE } from "./constants";
import { genEmptyGridState } from "./utils";

export interface IGameState {
    GRID_SIZE: number,
    WORD_SIZE: number,
    grid: GridCell[][],
    updateGrid: (rowIdx: number, newRow: GridCell[]) => void,
    currGuess: number,
    word: string,
    checkGuess: (guess: string) => void,
    gameId: string,
    playerId: string,
    oppScore: number,
}

export const initGameState: IGameState = {
    GRID_SIZE,
    WORD_SIZE,
    grid: genEmptyGridState(GRID_SIZE, WORD_SIZE),
    updateGrid: () => { },
    currGuess: 0,
    word: '',
    checkGuess: () => { },
    gameId: '',
    playerId: '',
    oppScore: 0,
};

export const GameContext = createContext(initGameState);
