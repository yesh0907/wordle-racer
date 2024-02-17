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
        <div className='w-full inline-flex justify-center items-center text-3xl leading-none font-bold align-middle box-border uppercase border-2 border-solid border-gray-300'>
            {value}
        </div>
    )
}