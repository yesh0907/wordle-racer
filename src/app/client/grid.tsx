"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { GameContext } from "./game";
import Cell from "./cell";

const widthFactor = 6;
const heightFactor = 5;
const defaultWidth = 350;

export default function Grid() {
    const { grid } = useContext(GameContext);
    const gridRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState([0,0]);
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

    return (
        <div ref={gridRef} className="flex justify-center items-center flex-grow overflow-hidden">
            <div 
                className="grid grid-rows-6 gap-1 p-2 box-border"
                style={{width, height}}
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
    )
}