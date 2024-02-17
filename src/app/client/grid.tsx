"use client";

import { useContext } from "react";
import { GameContext } from "./game";
import Cell from "./cell";

export default function Grid() {
    const {grid} = useContext(GameContext);

    return (
        <div className="flex flex-col w-full items-center gap-2 min-w-0">
            {grid.map((row, rowIdx) => (
                <div key={rowIdx} className="flex flex-row gap-2 w-full justify-center min-w-0">
                    {row.map((cellData, cellIdx) => (
                        <Cell key={cellIdx} data={cellData} />
                    ))}
                </div>
            ))}
        </div>
    )
}