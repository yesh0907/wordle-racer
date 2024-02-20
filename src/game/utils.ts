import { GridCell, GRID_STATE } from "./constants";

export const genEmptyGridState = (gridSize: number, wordSize: number) => {
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