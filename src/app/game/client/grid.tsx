"use client";

import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Cell from "./cell";
import { GameContext } from "@/game/state";
import Progress from "./progress";
import { GRID_STATE, WORD_SIZE } from "@/game/constants";

const widthFactor = 3;
const heightFactor = 2;
const defaultWidth = 300;

export default function Grid() {
    const { grid, currGuess } = useContext(GameContext);
    const gridRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState([0, 0]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const updateWindowSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    useEffect(() => {
        if (!gridRef.current) return;
        const gridSize = gridRef.current.clientHeight;
        const w = Math.min(Math.floor(gridSize * (heightFactor / widthFactor)), defaultWidth);
        const h = Math.floor(w / heightFactor) * widthFactor;
        setWidth(() => w);
        setHeight(() => h);
    }, [windowSize]);

    const greens = useMemo(() => {
        if (currGuess !== 0) {
            return grid[currGuess - 1].reduce((count, { state }) => (
                state === GRID_STATE.CORRECT_IN_RIGHT_PLACE ? count + 1 : count
            ), 0);
        }
        return 0;
    }, [grid, currGuess]);

    return (
        <div ref={gridRef} className="flex items-center justify-center flex-grow overflow-hidden px-2">
            <Progress height={height} isPlayer ratio={greens / WORD_SIZE} />
            <div className="flex justify-center items-center flex-grow overflow-hidden">
                <div
                    className="grid grid-rows-6 gap-1 p-2 box-border"
                    style={{ width, height }}
                >
                    {grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="grid grid-cols-5 gap-1">
                            {row.map((cellData, cellIdx) => (
                                <Cell key={cellIdx} data={cellData} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Progress height={height} ratio={1 / 5} />
        </div>
    )
}