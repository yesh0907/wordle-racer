"use client";

import { GRID_STATE, GridCell } from "./game";

interface CellProps {
    data: GridCell,
};

export default function Cell({ data }: CellProps) {
    const {value, state} = data;
    let bg;
    if (state === GRID_STATE.EMPTY) {
        bg = 'bg-transparent';
    }
    return (
        <div className={`min-w-0 w-[56px] h-[56px] border-2 border-solid border-gray-400 bg-transparent flex items-center justify-center`}>
            {value.length > 0 ? value : 'A'}
        </div>
    )
}