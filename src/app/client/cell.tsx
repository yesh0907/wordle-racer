"use client";

import { GRID_STATE, GridCell } from "./game";

interface CellProps {
    data: GridCell,
};

export default function Cell({ data }: CellProps) {
    const { value, state } = data;
    let bg;
    if (state === GRID_STATE.INCORRECT) {
        bg = 'bg-gray-700';
    } else if (state === GRID_STATE.CORRECT_IN_RIGHT_PLACE) {
        bg = 'bg-green-600';
    } else if (state === GRID_STATE.CORRECT_IN_WRONG_PLACE) {
        bg = 'bg-yellow-500';
    } else {
        bg = 'bg-transparent';
    }
    return (
        <div className={`w-ful inline-flex justify-center items-center text-3xl\
            leading-none font-bold align-middle box-border uppercase border-2\
            border-solid border-gray-300 ${bg}`}>
            {value}
        </div>
    )
}