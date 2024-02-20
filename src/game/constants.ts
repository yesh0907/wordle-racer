export const GRID_SIZE = 6;
export const WORD_SIZE = 5;

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
